/*
  # Add user settings columns to user_profiles table

  1. New Columns
    - `notifications_enabled` (boolean) - Controls push notifications
    - `location_enabled` (boolean) - Controls location services
  
  2. Changes
    - Add default values (true for both settings)
    - Update existing users to have default settings enabled
*/

-- Add notifications_enabled column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'notifications_enabled'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN notifications_enabled boolean DEFAULT true;
  END IF;
END $$;

-- Add location_enabled column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'location_enabled'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN location_enabled boolean DEFAULT true;
  END IF;
END $$;

-- Update existing users to have default settings enabled
UPDATE user_profiles 
SET 
  notifications_enabled = COALESCE(notifications_enabled, true),
  location_enabled = COALESCE(location_enabled, true)
WHERE notifications_enabled IS NULL OR location_enabled IS NULL;