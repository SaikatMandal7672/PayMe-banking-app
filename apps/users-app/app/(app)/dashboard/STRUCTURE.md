# Dashboard Structure Documentation

## 📁 File Organization

```
dashboard/
├── page.tsx                          # Main dashboard page (48 lines)
├── layout.tsx                        # Dashboard layout with Navbar & Sidebar
│
├── _lib/                             # Utility functions & data fetching
│   └── getDashboardData.ts           # Fetches all dashboard data from DB
│
├── _components/                      # Reusable components
│   ├── home/                         # Home page specific components
│   │   ├── index.ts                  # Barrel exports
│   │   ├── WelcomeSection.tsx        # User greeting (18 lines)
│   │   ├── BalanceCards.tsx          # Balance overview cards (73 lines)
│   │   ├── QuickActions.tsx          # Quick action buttons (56 lines)
│   │   ├── RecentP2PTransactions.tsx # P2P transaction list (110 lines)
│   │   ├── RecentBankTransfers.tsx   # Bank transfer list (100 lines)
│   │   ├── AccountStats.tsx          # Statistics grid (65 lines)
│   │   └── README.md                 # Component documentation
│   │
│   ├── AddMoneyCard.tsx              # Used in transfer page
│   ├── BalanceCard.tsx               # Used in transfer page
│   ├── OnRampTransaction.tsx         # Used in multiple pages
│   ├── P2PCard.tsx                   # Used in p2p page
│   ├── PeerTransaction.tsx           # Used in transaction page
│   ├── Sidebar.tsx                   # Navigation sidebar
│   └── SidebarItem.tsx               # Sidebar menu items
│
├── transfer/                         # Transfer page
│   └── page.tsx
│
├── p2p/                              # Peer-to-peer transfer page
│   └── page.tsx
│
└── transaction/                      # Transactions history page
    └── page.tsx
```

## 🎯 Component Breakdown

### Main Page (page.tsx)
**Before:** 415 lines of monolithic code  
**After:** 48 lines with clean component composition

**Responsibilities:**
- Fetch data using `getDashboardData()`
- Pass data to child components
- Layout composition

### Data Layer (_lib/)
**getDashboardData.ts**
- Fetches user session
- Queries database for:
  - Balance information
  - Recent P2P transactions (last 5)
  - Recent bank transfers (last 5)
  - Transaction counts
- Returns formatted data

### UI Components (_components/home/)

#### 1. **WelcomeSection** (18 lines)
- Displays user name
- Shows contextual message
- Simple, focused component

#### 2. **BalanceCards** (73 lines)
- Three gradient cards
- Total, Unlocked, Locked balances
- Icons and formatting
- Responsive grid

#### 3. **QuickActions** (56 lines)
- Four action buttons
- Navigation links
- Hover effects
- Icon + label layout

#### 4. **RecentP2PTransactions** (110 lines)
- Transaction list with direction indicators
- Sent/Received logic
- Empty state handling
- "View All" link

#### 5. **RecentBankTransfers** (100 lines)
- Bank deposit list
- Status badges
- Provider information
- Empty state handling

#### 6. **AccountStats** (65 lines)
- Statistics grid
- Four key metrics
- Responsive layout
- Consistent styling

## 📊 Code Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Main page lines | 415 | 48 | 88% reduction |
| Components | 1 | 7 | Better separation |
| Reusability | Low | High | ✅ |
| Maintainability | Hard | Easy | ✅ |
| Testability | Difficult | Simple | ✅ |

## 🔄 Data Flow

```
1. User visits /dashboard
   ↓
2. page.tsx renders (Server Component)
   ↓
3. getDashboardData() executes
   ↓
4. Parallel database queries via Promise.all()
   ↓
5. Data formatted and returned
   ↓
6. Props passed to child components
   ↓
7. Components render with data
   ↓
8. HTML sent to client
```

## 🎨 Design Patterns Used

### 1. **Component Composition**
Breaking down complex UI into smaller, focused components.

### 2. **Single Responsibility Principle**
Each component has one clear purpose.

### 3. **Props Drilling (Controlled)**
Data flows down from parent to children via props.

### 4. **Barrel Exports**
Clean imports using index.ts files.

### 5. **Server Components**
Leveraging Next.js 13+ App Router for server-side rendering.

### 6. **Parallel Data Fetching**
Using Promise.all() for optimal performance.

## 🚀 Benefits

### For Developers:
- ✅ **Easy to understand** - Each file has a clear purpose
- ✅ **Easy to modify** - Change one component without affecting others
- ✅ **Easy to test** - Small, isolated units
- ✅ **Easy to reuse** - Components can be used elsewhere
- ✅ **Easy to debug** - Smaller surface area for bugs

### For Performance:
- ✅ **Server-side rendering** - Fast initial page load
- ✅ **Parallel queries** - Optimized database access
- ✅ **Code splitting** - Smaller bundle sizes
- ✅ **Tree shaking** - Unused code eliminated

### For Maintenance:
- ✅ **Clear structure** - Easy to navigate
- ✅ **Type safety** - TypeScript interfaces
- ✅ **Documentation** - README files
- ✅ **Consistent patterns** - Predictable code

## 📝 Naming Conventions

### Files:
- **PascalCase** for components: `WelcomeSection.tsx`
- **camelCase** for utilities: `getDashboardData.ts`
- **lowercase** for config: `index.ts`

### Folders:
- **Prefix with underscore** for private: `_components/`, `_lib/`
- **Descriptive names**: `home/`, `transfer/`, `p2p/`

### Components:
- **Descriptive names**: `RecentP2PTransactions` not `Transactions`
- **Export named**: `export const WelcomeSection`
- **Default export** for pages: `export default Dashboard`

## 🔧 How to Add New Components

1. Create file in `_components/home/`
2. Define TypeScript interface for props
3. Implement component logic
4. Export from `index.ts`
5. Import in `page.tsx`
6. Pass required props
7. Update README.md

Example:
```tsx
// _components/home/NewComponent.tsx
interface NewComponentProps {
  data: string;
}

export const NewComponent = ({ data }: NewComponentProps) => {
  return <div>{data}</div>;
};

// _components/home/index.ts
export { NewComponent } from "./NewComponent";

// page.tsx
import { NewComponent } from "./_components/home";

<NewComponent data="Hello" />
```

## 🎯 Best Practices

1. **Keep components small** - Under 150 lines
2. **Use TypeScript** - Define all prop types
3. **Handle empty states** - Show helpful messages
4. **Add loading states** - For async operations
5. **Use semantic HTML** - Accessibility matters
6. **Follow conventions** - Consistent code style
7. **Document changes** - Update README files
8. **Test components** - Write unit tests

## 📚 Related Documentation

- [Component README](/_components/home/README.md)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

