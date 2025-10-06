# Chat Application

## Overview

A modern chat application built with React and Express, featuring a clean, dark-mode-first interface inspired by platforms like Slack, Discord, and WhatsApp. The application provides dual chat functionality - regular chat and agent chat - with a focus on usability and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for type safety and component-based architecture
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and data fetching
- Tailwind CSS for utility-first styling with custom design tokens

**UI Component System:**
- shadcn/ui component library (Radix UI primitives) for accessible, customizable components
- Custom components built on top of shadcn/ui base components
- Design system following "New York" style variant
- Component aliases configured for clean imports (@/components, @/lib, @/hooks)

**State Management:**
- React Query for async state and API data caching
- Local component state with React hooks
- Toast notifications for user feedback

**Key Design Decisions:**
- Mobile-first responsive approach with breakpoint at 768px
- Dark mode as primary theme with carefully crafted color palette
- Custom elevation system using overlay transparency (elevate-1, elevate-2)
- Consistent spacing using Tailwind's spacing scale (primarily 2, 3, 4, 6, 8)

### Backend Architecture

**Technology Stack:**
- Express.js as the web server framework
- TypeScript for type safety across the stack
- ESM (ES Modules) for modern JavaScript module system

**Server Structure:**
- Routes are registered through a centralized routing system (`registerRoutes`)
- Storage abstraction layer with interface-based design (IStorage)
- In-memory storage implementation (MemStorage) as default, designed to be swapped for database-backed storage
- HTTP server creation with proper request/response logging
- Custom Vite integration for development with HMR support

**API Design:**
- All API routes prefixed with `/api`
- RESTful endpoint structure
- Request/response logging with duration tracking
- Error handling middleware with proper status codes

**Storage Layer:**
- Interface-based storage design allows easy switching between implementations
- Current MemStorage provides in-memory user management
- Designed for future PostgreSQL/Drizzle ORM integration
- CRUD operations abstracted through IStorage interface

### Data Storage Solutions

**Current Implementation:**
- In-memory storage using Map data structures
- User management with UUID-based IDs
- Prepared for Drizzle ORM migration

**Database Schema (Prepared):**
- PostgreSQL as target database (Drizzle config present)
- Users table with id (UUID), username (unique), and password fields
- Schema validation using Drizzle-Zod
- Migration system configured via drizzle-kit

**Why This Approach:**
- Allows rapid development with in-memory storage
- Clean migration path to PostgreSQL when needed
- Type-safe schema definitions shared between client and server
- Database-agnostic storage interface

### Authentication and Authorization

**Planned Implementation:**
- User registration and login through REST API
- Password-based authentication
- Session management (connect-pg-simple configured for PostgreSQL sessions)
- Frontend route protection (login page → chat page flow)

**Current State:**
- Basic user schema defined with username/password
- Login form UI implemented
- Backend authentication endpoints not yet implemented (marked with TODO comments)
- Storage layer ready for user creation and retrieval

### External Dependencies

**Core UI Libraries:**
- Radix UI primitives for accessible component foundations
- Lucide React for consistent iconography
- Tailwind CSS with PostCSS for styling
- class-variance-authority for component variant management

**Data & Forms:**
- React Hook Form with Zod resolvers for form validation
- TanStack Query for server state
- date-fns for date formatting

**Database & ORM:**
- Drizzle ORM for type-safe database operations
- @neondatabase/serverless for PostgreSQL connectivity
- connect-pg-simple for PostgreSQL session storage

**Development Tools:**
- Vite with React plugin for fast development
- TypeScript for type checking
- ESBuild for production server bundling
- Replit-specific plugins for development environment integration

**Design System:**
- Google Fonts: Inter (primary), JetBrains Mono (monospace)
- Custom CSS variables for theme tokens
- Responsive breakpoints and mobile detection hooks