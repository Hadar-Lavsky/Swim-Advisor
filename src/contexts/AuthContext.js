import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  // Memoized profile fetcher to prevent unnecessary re-creation
  const fetchProfile = useCallback(async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, goal')
        .eq('id', userId)
        .single();

      if (error) {
        // Profile doesn't exist - create it
        if (error.code === 'PGRST116') {
          const { data: userData } = await supabase.auth.getUser();
          const newProfile = {
            id: userId,
            name: userData?.user?.user_metadata?.name || userData?.user?.email?.split('@')[0] || 'Swimmer',
            goal: null,
          };

          const { data: createdProfile, error: createError } = await supabase
            .from('profiles')
            .insert(newProfile)
            .select('id, name, goal')
            .single();

          if (!createError && createdProfile) {
            setProfile(createdProfile);
            setIsNewUser(true);
          } else {
            console.error('Error creating profile:', createError);
          }
        } else {
          console.error('Error fetching profile:', error);
        }
      } else if (data) {
        setProfile(data);
        setIsNewUser(false);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initialize auth state
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes (sign in, sign out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        // Optimize by only fetching profile on sign-in, not on every token refresh
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setIsNewUser(false);
          setLoading(false);
        } else if (event === 'TOKEN_REFRESHED') {
          // Just update user, don't refetch profile
          setUser(session?.user ?? null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      // Optimistically clear state immediately for faster UX
      setUser(null);
      setProfile(null);
      setIsNewUser(false);
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        // Note: We keep the optimistic state even if signOut fails
        // because the user clearly wants to sign out
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates) => {
    try {
      // Optimistically update the UI immediately
      const previousProfile = profile;
      setProfile({ ...profile, ...updates });

      // Then update the database in the background
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        // Rollback on error
        setProfile(previousProfile);
        throw error;
      }
      
      // Update with the actual data from database if successful
      setProfile({ ...profile, ...updates });
      return { data: { ...profile, ...updates }, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const clearNewUserFlag = () => {
    setIsNewUser(false);
  };

  const value = {
    user,
    profile,
    loading,
    isNewUser,
    signInWithGoogle,
    signOut,
    updateProfile,
    clearNewUserFlag,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


