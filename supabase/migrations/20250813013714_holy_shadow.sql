/*
  # Create RPC functions for atomic operations

  1. Community Post Functions
    - increment_likes_count: Safely increment likes count
    - decrement_likes_count: Safely decrement likes count  
    - increment_comments_count: Safely increment comments count
    - increment_shares_count: Safely increment shares count

  2. Interest Group Functions
    - increment_member_count: Safely increment member count
    - decrement_member_count: Safely decrement member count

  3. Utility Functions
    - update_updated_at_column: Generic trigger function for updated_at
*/

-- Function to increment likes count for a community post
CREATE OR REPLACE FUNCTION public.increment_likes_count(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.community_posts
  SET likes_count = likes_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement likes count for a community post
CREATE OR REPLACE FUNCTION public.decrement_likes_count(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.community_posts
  SET likes_count = GREATEST(likes_count - 1, 0)
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment comments count for a community post
CREATE OR REPLACE FUNCTION public.increment_comments_count(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.community_posts
  SET comments_count = comments_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment shares count for a community post
CREATE OR REPLACE FUNCTION public.increment_shares_count(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.community_posts
  SET shares_count = shares_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment member count for an interest group
CREATE OR REPLACE FUNCTION public.increment_member_count(group_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.interest_groups
  SET member_count = member_count + 1
  WHERE id = group_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement member count for an interest group
CREATE OR REPLACE FUNCTION public.decrement_member_count(group_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.interest_groups
  SET member_count = GREATEST(member_count - 1, 0)
  WHERE id = group_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;