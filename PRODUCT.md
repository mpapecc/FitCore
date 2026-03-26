# FitCore — Product Definition

> Claude Code must read this file before building any feature, screen, or component.
> Every decision about what a user can see or do must follow the rules defined here.

---

## 1. User Roles

| Role | Who they are | Access level |
|---|---|---|
| **Admin** | Gym owner / manager | Full access to everything |
| **Trainer** | Gym staff | Manages their own classes and assigned members |
| **Member** | Gym customer | Manages own bookings, progress, and account |

---

## 2. Modules & Access Matrix

| Module | Admin | Trainer | Member |
|---|---|---|---|
| **Dashboard** | Full stats overview | Their classes & today's sessions | Personal progress summary |
| **Members** | Full CRUD, assign trainers | View assigned members only | Own profile only |
| **Class Scheduling** | Create/edit all classes | Manage their own classes | Browse & book classes |
| **Workout Tracking** | View all logs | Log workouts for their members | View own workout history |
| **Nutrition** | Create & assign meal plans | Assign plans to their members | View own meal plan |
| **Billing** | Full invoice management | No access | View own invoices only |
| **Notifications** | Send to anyone | Send to their members | Receive only |
| **Settings** | Full app settings | Own profile settings | Own profile settings |

---

## 3. Screen Map

### Admin — 8 screens
1. Dashboard
2. Members List
3. Member Profile
4. Class Schedule
5. Workout Logs
6. Nutrition Plans
7. Billing & Invoices
8. Settings

### Trainer — 5 screens
1. Dashboard
2. My Classes
3. My Members
4. Workout Logger
5. Profile Settings

### Member — 6 screens
1. Dashboard
2. Class Booking
3. My Bookings
4. My Progress
5. Nutrition Plan
6. My Invoices

---

## 4. Auth Flow (shared across all roles)

- **Login page** — role detected automatically from account type
- **Forgot password / reset** — email-based reset flow
- **First-time onboarding** — shown only to new members on first login

---

## 5. Key Business Rules

These rules must always be enforced in UI logic, validation, and API calls:

### Members & Bookings
- A member **cannot** book a class that is already full — show "Class Full" state
- A member **can cancel** a booking up to 2 hours before the class starts
- A trainer **can only see** members assigned to them — never show other members
- An admin **can assign/reassign** trainers to members

### Billing
- Invoices are **generated automatically** on membership renewal date
- A member with an **overdue invoice** gets a warning banner but is **not locked out**
- Trainers have **no access** to billing at all — never show billing UI to trainers

### Notifications
Notifications are triggered automatically by these events:

| Trigger | Timing |
|---|---|
| Class reminder | 1 hour before class |
| Invoice due | 3 days before due date |
| Membership expiry | 7 days before expiry |

---

## 6. Dashboard Content (per role)

### Admin Dashboard
- **Stat cards:** Total Members, Active Memberships, Monthly Revenue, New Members This Month
- **Chart:** Revenue over time (line chart)
- **Sections:** Recent member signups, Upcoming renewals, Recent payments, Today's check-ins

### Trainer Dashboard
- **Stat cards:** My Classes Today, Total Assigned Members, Sessions This Week
- **Sections:** Today's class schedule, Recently logged workouts, My assigned members

### Member Dashboard
- **Stat cards:** Classes Booked, Workouts Logged, Days Until Membership Expires
- **Sections:** Upcoming bookings, Recent workout history, Current nutrition plan summary

---

## 7. Role-Based UI Rules

When generating any screen or component, always ask:

1. **Which role is this for?** — Never mix role-specific UI
2. **Does this role have access?** — Check the access matrix in section 2
3. **What business rules apply?** — Check section 5 before building any interactive feature
4. **What does this role's dashboard show?** — Check section 6 for dashboard content

### Navigation per role

**Admin sidebar:**
```
Dashboard / Members / Class Schedule / Workout Logs /
Nutrition Plans / Billing & Invoices / Settings
```

**Trainer sidebar:**
```
Dashboard / My Classes / My Members / Workout Logger / Profile Settings
```

**Member sidebar (or bottom tabs on mobile):**
```
Dashboard / Class Booking / My Bookings / My Progress /
Nutrition Plan / My Invoices
```

---

## 8. Placeholder Data Conventions

When generating UI with dummy data, always use realistic gym data:

| Data type | Example values |
|---|---|
| Member names | John Carter, Sarah Mills, Mike Torres, Emma Davis |
| Plan names | Basic, Pro, Elite, Student |
| Class names | Morning HIIT, Yoga Flow, Strength & Conditioning, Spin Class |
| Trainer names | Coach Alex, Coach Maria, Coach Ben |
| Revenue amounts | realistic monthly figures ($3,000 — $15,000) |
| Member counts | realistic gym size (50 — 300 members) |