export const CARD_SIZES = {
  width: 283,
  height: {
    bookmark: 368,
    dailyReminderHeader: 40,
  },
  thumbnail: {
    width: 253,
    height: 130,
  },
  memo: {
    width: 253,
    height: 96,
    inner: {
      width: 229,
      height: 72,
    },
  },
} as const;

export const LEVEL_INFO = {
  container: {
    width: 338,
    height: 605,
  },
  title: {
    top: 25,
    width: 116,
    height: 35,
  },
  content: {
    left: 38,
    top: 75,
    width: 211,
  },
  item: {
    width: 211,
    height: 77,
    gap: 23,
    image: {
      width: 94,
      height: 70,
    },
    badge: {
      width: 44,
      height: 22,
    },
    name: {
      width: 101,
      height: 21,
    },
    acorn: {
      size: 18,
    },
  },
  description: {
    width: 283,
    height: 62,
    marginTop: 10,
    marginBottom: 25,
    marginLeft: -10,
  },
} as const;

export const LAYOUT = {
  maxWidth: 1440,
  padding: {
    container: 4,
    card: 15,
    cardVertical: 20,
    memo: 12,
  },
  spacing: {
    section: 8,
    card: 4,
    category: 20,
    thumbnail: 18,
    title: 12,
    levelGap: 12,
  },
  borderRadius: {
    card: 10,
    memo: 6,
    category: '3.125rem',
    button: '5rem',
  },
} as const;

export const ICON_SIZES = {
  small: 16,
  medium: 24,
  large: 27,
} as const;

export const GRID = {
  bookmark: {
    cols: 2,
    gap: 4,
  },
  dailyReminder: {
    cols: { default: 1, md: 2 },
    gap: 4,
  },
} as const;
