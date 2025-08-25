-- PostgreSQL Schema for PrideMap with User Features
-- Drop tables if they exist (for development)
DROP TABLE IF EXISTS event_upvotes CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Events table (based on your current event structure)
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    external_id BIGINT, -- For migrated events from your current data
    name VARCHAR(500) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    time VARCHAR(100) NOT NULL,
    date VARCHAR(50) NOT NULL, -- Keeping as string to match your current format
    price VARCHAR(100),
    type VARCHAR(50) NOT NULL CHECK (type IN ('party', 'social', 'workshop')),
    tags TEXT[], -- PostgreSQL array for tags
    genres TEXT[], -- PostgreSQL array for genres
    age_restriction VARCHAR(20),
    description TEXT,
    image_url VARCHAR(500),
    website_link VARCHAR(500),
    ticket_link VARCHAR(500),
    coordinates POINT, -- PostGIS point type for lat/lng
    selling_fast BOOLEAN DEFAULT FALSE,
    scraped_from VARCHAR(100),
    scraped_date TIMESTAMP WITH TIME ZONE,
    
    -- User-generated event fields
    created_by INTEGER REFERENCES users(id),
    is_user_generated BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE, -- For moderation
    upvote_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE, -- For nested comments
    content TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Event upvotes table
CREATE TABLE event_upvotes (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, user_id) -- Prevent duplicate upvotes
);

-- Indexes for performance
CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_coordinates ON events USING GIST(coordinates);
CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_is_approved ON events(is_approved);
CREATE INDEX idx_comments_event_id ON comments(event_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_event_upvotes_event_id ON event_upvotes(event_id);
CREATE INDEX idx_event_upvotes_user_id ON event_upvotes(user_id);

-- Triggers to update counters
CREATE OR REPLACE FUNCTION update_event_upvote_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE events 
        SET upvote_count = upvote_count + 1 
        WHERE id = NEW.event_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE events 
        SET upvote_count = upvote_count - 1 
        WHERE id = OLD.event_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_event_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE events 
        SET comment_count = comment_count + 1 
        WHERE id = NEW.event_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE events 
        SET comment_count = comment_count - 1 
        WHERE id = OLD.event_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_upvote_count
    AFTER INSERT OR DELETE ON event_upvotes
    FOR EACH ROW EXECUTE FUNCTION update_event_upvote_count();

CREATE TRIGGER trigger_update_comment_count
    AFTER INSERT OR DELETE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_event_comment_count();

-- Sample data for testing
INSERT INTO users (username, email, password_hash, display_name, is_admin) VALUES
('admin', 'admin@onmygaydar.com', '$2b$10$example_hash', 'Admin User', TRUE),
('testuser', 'test@example.com', '$2b$10$example_hash', 'Test User', FALSE);

