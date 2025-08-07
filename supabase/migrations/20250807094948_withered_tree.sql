/*
  # Create RPC functions for atomic operations

  1. Functions
    - `increment_likes_count` - Safely increment post likes count
    - `increment_comments_count` - Safely increment post comments count  
    - `increment_shares_count` - Safely increment post shares count
    - `increment_member_count` - Safely increment group member count
    - `decrement_member_count` - Safely decrement group member count

  2. Security
    - Functions are accessible to authenticated users
    - Atomic operations prevent race conditions
*/

-- Function to increment likes count
CREATE OR REPLACE FUNCTION increment_likes_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE community_posts 
  SET likes_count = likes_count + 1 
  WHERE id = post_id;
END;
$$;

-- Function to increment comments count
CREATE OR REPLACE FUNCTION increment_comments_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE community_posts 
  SET comments_count = comments_count + 1 
  WHERE id = post_id;
END;
$$;

-- Function to increment shares count
CREATE OR REPLACE FUNCTION increment_shares_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE community_posts 
  SET shares_count = shares_count + 1 
  WHERE id = post_id;
END;
$$;

-- Function to increment group member count
CREATE OR REPLACE FUNCTION increment_member_count(group_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE interest_groups 
  SET member_count = member_count + 1 
  WHERE id = group_id;
END;
$$;

-- Function to decrement group member count
CREATE OR REPLACE FUNCTION decrement_member_count(group_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE interest_groups 
  SET member_count = GREATEST(member_count - 1, 0)
  WHERE id = group_id;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION increment_likes_count(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_comments_count(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_shares_count(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_member_count(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION decrement_member_count(uuid) TO authenticated;