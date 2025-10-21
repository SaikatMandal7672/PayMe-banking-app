# Dashboard Home Components

This directory contains all the modular components used in the dashboard home page.

## Component Structure

```
home/
├── index.ts                      # Barrel export for clean imports
├── WelcomeSection.tsx            # User greeting header
├── BalanceCards.tsx              # Three balance overview cards
├── QuickActions.tsx              # Quick action buttons grid
├── RecentP2PTransactions.tsx     # Recent peer-to-peer transactions
├── RecentBankTransfers.tsx       # Recent bank deposits
└── AccountStats.tsx              # Account statistics overview
```

## Components

### 1. WelcomeSection
**Purpose:** Displays personalized welcome message to the user.

**Props:**
- `userName: string` - The user's name to display

**Usage:**
```tsx
<WelcomeSection userName="John Doe" />
```

---

### 2. BalanceCards
**Purpose:** Shows three gradient cards displaying total, unlocked, and locked balances.

**Props:**
- `totalBalance: number` - Total balance in paise (₹ × 100)
- `unlockedBalance: number` - Available balance in paise
- `lockedBalance: number` - Locked balance in paise

**Features:**
- Gradient backgrounds (purple, green, orange)
- Icons for each card type
- Responsive grid layout
- Currency formatting

**Usage:**
```tsx
<BalanceCards
  totalBalance={50000}
  unlockedBalance={40000}
  lockedBalance={10000}
/>
```

---

### 3. QuickActions
**Purpose:** Provides quick access buttons to main app features.

**Props:** None (stateless component)

**Features:**
- 4 action buttons: Add Money, Send Money, Transactions, Transfer
- Hover effects
- Responsive grid (2 cols mobile, 4 cols desktop)
- Icon + label layout

**Usage:**
```tsx
<QuickActions />
```

---

### 4. RecentP2PTransactions
**Purpose:** Displays recent peer-to-peer money transfers.

**Props:**
- `transactions: P2PTransaction[]` - Array of P2P transactions
- `userId: string` - Current user's ID to determine sent/received

**Transaction Type:**
```typescript
interface P2PTransaction {
  id: string;
  amount: number;
  time: Date;
  fromUser: string;
  toUser: string;
  fromName: string | null;
  toName: string | null;
}
```

**Features:**
- Direction indicators (sent = red, received = green)
- User names display
- Date formatting
- Empty state with CTA
- "View All" link

**Usage:**
```tsx
<RecentP2PTransactions
  transactions={p2pTransactions}
  userId="user123"
/>
```

---

### 5. RecentBankTransfers
**Purpose:** Shows recent bank deposits (OnRamp transactions).

**Props:**
- `transactions: BankTransfer[]` - Array of bank transfers

**Transaction Type:**
```typescript
interface BankTransfer {
  amount: number;
  time: Date;
  status: string;
  provider: string;
}
```

**Features:**
- Status badges (Success/Processing/Failed)
- Provider names
- Amount formatting
- Empty state with CTA
- "View All" link

**Usage:**
```tsx
<RecentBankTransfers transactions={bankTransfers} />
```

---

### 6. AccountStats
**Purpose:** Displays key account statistics in a grid.

**Props:**
- `totalP2PTransactions: number` - Total count of P2P transfers
- `totalBankDeposits: number` - Total count of bank deposits
- `availableBalance: number` - Available balance in paise
- `recentActivityCount: number` - Count of recent activities

**Features:**
- 4-column responsive grid
- Large numbers with labels
- Consistent styling

**Usage:**
```tsx
<AccountStats
  totalP2PTransactions={25}
  totalBankDeposits={10}
  availableBalance={40000}
  recentActivityCount={8}
/>
```

---

## Design Principles

### 1. **Single Responsibility**
Each component handles one specific UI concern.

### 2. **Reusability**
Components are designed to be reused across different pages if needed.

### 3. **Type Safety**
All components use TypeScript interfaces for props.

### 4. **Responsive Design**
Mobile-first approach with breakpoints:
- Mobile: Single column / 2 columns
- Tablet (md): 2-3 columns
- Desktop (lg): Full multi-column layout

### 5. **Consistent Styling**
- Uses Tailwind CSS
- Follows magnolia color scheme
- Consistent spacing and shadows

---

## Data Flow

```
page.tsx
  ↓
getDashboardData() (from _lib/)
  ↓
Fetches data from database
  ↓
Passes data as props to components
  ↓
Components render UI
```

---

## Styling Conventions

- **Colors:**
  - Primary: `magnolia-800`, `magnolia-600`, `magnolia-700`
  - Success: `green-600`, `green-500`
  - Warning: `orange-600`, `orange-500`
  - Error: `red-600`
  - Info: `blue-600`

- **Spacing:**
  - Section margins: `mb-8`
  - Card gaps: `gap-4 md:gap-6`
  - Internal padding: `p-3`, `px-4 md:px-10`

- **Typography:**
  - Headings: `text-4xl md:text-5xl font-bold`
  - Subheadings: `text-2xl font-semibold`
  - Card titles: `text-xl`
  - Body: `text-sm`, `text-lg`

---

## Future Enhancements

- [ ] Add loading skeletons
- [ ] Add error boundaries
- [ ] Add animation transitions
- [ ] Add data refresh functionality
- [ ] Add export/download features
- [ ] Add filtering options for transactions

