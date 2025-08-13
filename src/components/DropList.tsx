'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

interface DropListItem {
  id: string;
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropListProps {
  title: string;
  route: string;
  setIsOpened: (opened: boolean) => void;
  IsOpened: boolean;
  items: DropListItem[];
  onItemSelect?: (item: DropListItem) => void;
  className?: string;
  buttonClassName?: string;
  listClassName?: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  maxHeight?: number;
  searchable?: boolean;
  placeholder?: string;
}

const DropList: React.FC<DropListProps> = ({
  title,
  route,
  setIsOpened,
  IsOpened,
  items = [],
  onItemSelect,
  className = '',
  buttonClassName = '',
  listClassName = '',
  position = 'bottom-left',
  maxHeight = 300,
  searchable = false,
  placeholder = 'Search...'
}) => {
  const dropListRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState(items);
  const router = useRouter()

  // Filter items based on search term
  useEffect(() => {
    if (searchable && searchTerm) {
      const filtered = items.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchTerm, items, searchable]);

  // GSAP Animation Timeline
  useEffect(() => {
    if (!listRef.current) return;

    // Create timeline
    const tl = gsap.timeline({ paused: true });
    timelineRef.current = tl;

    // Initial state
    gsap.set(listRef.current, {
      opacity: 0,
      z: -100,
      y: -20,
      scale: 0.8,
      transformOrigin: position.includes('top') ? 'bottom center' : 'top center',
      borderColor: '#000000',
      visibility: 'hidden'
    });

    // Animation sequence
    tl.to(listRef.current, {
      visibility: 'visible',
      duration: 0
    })
    .to(listRef.current, {
      opacity: 1,
      z: 0,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.2)'
    })
    .to(listRef.current, {
      borderColor: '#ffffff',
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, [position]);

  // Handle open/close animations
  useEffect(() => {
    if (!timelineRef.current) return;

    if (IsOpened) {
      timelineRef.current.play();
      // Focus search input if searchable
      if (searchable && searchRef.current) {
        setTimeout(() => {
          searchRef.current?.focus();
        }, 100);
      }
    } else {
      timelineRef.current.reverse();
      setSearchTerm('');
    }
  }, [IsOpened, searchable]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropListRef.current && !dropListRef.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    };

    if (IsOpened) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [IsOpened, setIsOpened]);

  // Handle item selection
  const handleItemClick = (item: DropListItem) => {
    if (item.disabled) return;
    onItemSelect?.(item);
    setIsOpened(false);
    router.push(`${item.value}`)
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpened(false);
    }
  };

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'top-full right-0 mt-2';
      case 'top-left':
        return 'bottom-full left-0 mb-2';
      case 'top-right':
        return 'bottom-full right-0 mb-2';
      default: // bottom-left
        return 'top-full right-0 mt-5';
    }
  };

  return (
    <div ref={dropListRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
        <button
          ref={buttonRef}
          onClick={() => setIsOpened(!IsOpened)}
          className={`
            inline-flex items-center justify-between px-1 py-2 text-sm font-medium
            transition-all duration-200 cursor-pointer
            ${buttonClassName}
          `}
          aria-haspopup="listbox"
          aria-expanded={IsOpened}
        >
          <svg
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${
              IsOpened ? 'rotate-180' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

      {/* Dropdown List */}
      <div
        ref={listRef}
        className={`
          absolute z-50 ${getPositionClasses()}
          bg-white rounded-lg shadow-lg
          min-w-[200px] overflow-hidden
          ${listClassName}
        `}
        style={{ maxHeight: `${maxHeight}px` }}
        role="listbox"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        {searchable && (
          <div className="p-2 border-b border-gray-200">
            <input
              ref={searchRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Items List */}
        <div className="max-h-60 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              {searchTerm ? 'No results found' : 'No items available'}
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={`
                  w-full flex items-center px-4 py-3 text-left text-sm
                  hover:bg-blue-50 focus:bg-blue-50 focus:outline-none
                  transition-colors duration-150
                  ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${index !== filteredItems.length - 1 ? 'border-b border-gray-100' : ''}
                `}
                role="option"
                aria-selected={false}
              >
                {item.icon && (
                  <span className="mr-3 flex-shrink-0 text-gray-400">
                    {item.icon}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {item.label}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

// Example usage component
const DropListExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  const sampleItems = [
    { id: '1', label: 'Dashboard', value: '/dashboard', icon: '📊' },
    { id: '2', label: 'User Profile', value: '/profile', icon: '👤' },
    { id: '3', label: 'Settings', value: '/settings', icon: '⚙️' },
    { id: '4', label: 'Analytics', value: '/analytics', icon: '📈' },
    { id: '5', label: 'Reports', value: '/reports', icon: '📋', disabled: true },
    { id: '6', label: 'Help Center', value: '/help', icon: '❓' },
  ];

  return (
    <div className="p-8 space-y-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Generic DropList Examples</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic DropList */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Basic DropList</h3>
            <DropList
              title="Select Option"
              route="/current-route"
              setIsOpened={setIsOpen}
              IsOpened={isOpen}
              items={sampleItems}
              onItemSelect={(item) => {
                setSelectedItem(item);
                console.log('Selected:', item);
              }}
            />
            {selectedItem && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {selectedItem.label}
              </p>
            )}
          </div>

          {/* Searchable DropList */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Searchable DropList</h3>
            <DropList
              title="Search & Select"
              route="/search-route"
              setIsOpened={setIsOpen}
              IsOpened={isOpen}
              items={sampleItems}
              searchable={true}
              placeholder="Search options..."
              onItemSelect={(item) => console.log('Searched and selected:', item)}
              position="bottom-right"
            />
          </div>

          {/* Custom Styled DropList */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Custom Styled</h3>
            <DropList
              title="Custom Style"
              route="/custom-route"
              setIsOpened={setIsOpen}
              IsOpened={isOpen}
              items={sampleItems}
              buttonClassName="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
              listClassName="border-blue-500"
              position="top-left"
              onItemSelect={(item) => console.log('Custom styled selected:', item)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropList;
