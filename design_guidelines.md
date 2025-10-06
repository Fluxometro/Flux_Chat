# Design Guidelines: Chat Application

## Design Approach
**Selected Approach:** Design System + Reference-Based Hybrid

Drawing inspiration from modern messaging platforms (Slack, Discord, WhatsApp) while maintaining a clean, professional aesthetic. The application prioritizes usability, clarity, and efficient communication workflows.

**Core Design Principles:**
- Information clarity over decoration
- Consistent interaction patterns
- Seamless dark mode experience throughout
- Responsive, mobile-first approach

## Color Palette

**Dark Mode (Primary):**
- Background Primary: 222 47% 11% (deep charcoal)
- Background Secondary: 215 28% 17% (elevated surfaces)
- Background Tertiary: 217 33% 23% (hover states, cards)
- Text Primary: 210 40% 98% (high contrast text)
- Text Secondary: 215 20% 65% (muted text, timestamps)
- Border Color: 215 28% 25% (subtle dividers)

**Brand Colors:**
- Primary: 221 83% 53% (vibrant blue for CTAs, active states)
- Primary Hover: 221 83% 48%
- Success: 142 76% 36% (online status, sent messages)
- Accent: 280 60% 50% (notifications, unread indicators)

**Message Bubbles:**
- Client Messages (left): 215 28% 20% with light text
- User Messages (right): 221 83% 53% with white text

## Typography

**Font Family:**
- Primary: 'Inter' from Google Fonts
- Monospace: 'JetBrains Mono' for timestamps/metadata

**Type Scale:**
- Headings: font-semibold, text-lg to text-2xl
- Body Text: font-normal, text-sm to text-base
- Metadata/Timestamps: font-normal, text-xs, text-secondary
- Input Text: font-normal, text-base

## Layout System

**Spacing Primitives:**
Primary units: 2, 3, 4, 6, 8 (e.g., p-4, gap-6, m-8)

**Container Structure:**
- Login Page: max-w-md, centered with min-h-screen
- Main Chat Interface: Fixed dual-column (h-screen, overflow-hidden)
  - Left Column: w-80 to w-96 (fixed width on desktop)
  - Right Column: flex-1 (remaining space)
  - Mobile: Stack columns, full-width drawer pattern

**Grid System:**
- Chat List: Single column, gap-1 between items
- Message Thread: Single column with padding for readability
- Search Results: Single column overlay

## Component Library

### Login Page
- **Card Container:** Centered, rounded-xl, bg-secondary, shadow-2xl, p-8
- **Logo/Title:** text-2xl, font-bold, mb-8, centered
- **Input Fields:** 
  - Rounded-lg, bg-tertiary, border-transparent
  - Focus: ring-2, ring-primary
  - py-3, px-4, text-base
  - Error state: ring-red-500
- **Submit Button:** w-full, rounded-lg, bg-primary, py-3, font-semibold, hover:bg-primary-hover
- **Error Messages:** text-xs, text-red-400, mt-1

### Chat List (Left Column)
- **Header:** Sticky top, bg-secondary, p-4, border-b, includes search bar
- **Search Input:** Rounded-full, bg-tertiary, py-2, px-4, text-sm, w-full
- **Chat Item Card:**
  - Rounded-lg, p-3, hover:bg-tertiary, cursor-pointer
  - Active state: bg-tertiary, border-l-4 border-primary
  - Layout: Flex row with avatar (left) + content (right)
  - Avatar: w-12, h-12, rounded-full, bg-gradient
  - Name: font-semibold, text-base
  - Last Message: text-sm, text-secondary, truncate
  - Timestamp: text-xs, text-secondary, absolute top-right
  - Unread Badge: Rounded-full, bg-accent, px-2, py-0.5, text-xs

### Message Thread (Right Column)
- **Header:** Sticky top, bg-secondary, p-4, border-b
  - Contact Name: font-semibold, text-lg
  - Status Indicator: Inline, text-xs, text-success (online/offline)
- **Tabs:** Below header, border-b, flex row
  - Tab Button: px-6, py-3, text-sm, font-medium
  - Active: border-b-2, border-primary, text-primary
  - Inactive: text-secondary, hover:text-primary
- **Message Container:** flex-1, overflow-y-auto, p-4, space-y-4
- **Message Bubble:**
  - Client (left): max-w-[70%], rounded-2xl rounded-tl-sm, bg-tertiary, p-3
  - User (right): max-w-[70%], rounded-2xl rounded-tr-sm, bg-primary, p-3, ml-auto
  - Timestamp: text-xs, text-secondary, mt-1
  - Smooth entry animation: fade-in + slide-up
- **Input Area:** Sticky bottom, bg-secondary, p-4, border-t
  - Layout: Flex row, gap-3
  - Text Input: flex-1, rounded-full, bg-tertiary, py-3, px-4, resize-none
  - Send Button: Rounded-full, bg-primary, p-3, w-12, h-12, icon-centered, hover:bg-primary-hover

### Interactive States
- **Hover:** bg-tertiary for clickable items, subtle scale for buttons
- **Focus:** ring-2, ring-primary, ring-offset-2, ring-offset-background
- **Active:** Slightly darker background, scale-95 for buttons
- **Loading:** Subtle pulse animation on skeleton screens
- **Disabled:** opacity-50, cursor-not-allowed

## Responsive Behavior
- **Desktop (≥1024px):** Dual-column visible
- **Tablet (768px-1023px):** Collapsible left column with overlay
- **Mobile (<768px):** Single column with navigation drawer for chat list

## Accessibility
- All interactive elements have visible focus states
- Color contrast ratio ≥4.5:1 for text
- Keyboard navigation fully supported (Tab, Enter, Escape)
- Screen reader labels for icon-only buttons
- ARIA labels for dynamic content (new messages, unread counts)

## Animations
**Use Sparingly:**
- Message appearance: subtle slide-up + fade (150ms)
- Auto-scroll: smooth behavior
- Tab switching: crossfade content (200ms)
- Hover states: transition-colors duration-200

## Images
No hero images required. Use gradient-based avatars or placeholder user icons for chat participants.