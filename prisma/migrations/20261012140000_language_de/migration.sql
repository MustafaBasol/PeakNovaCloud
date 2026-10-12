-- Add German to the content language enum.
-- Safe to apply once: Postgres rejects a second ADD VALUE for the same label.
ALTER TYPE "Language" ADD VALUE 'de';
