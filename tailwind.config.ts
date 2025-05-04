
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite'
			},
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      // Add typography customizations here
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: { // Customizes the base 'prose' class
          css: {
            '--tw-prose-body': theme('colors.gray[700]'),
            '--tw-prose-headings': theme('colors.gray[900]'),
            '--tw-prose-lead': theme('colors.gray[600]'),
            '--tw-prose-links': theme('colors.blue[700]'),
            '--tw-prose-bold': theme('colors.gray[900]'),
            '--tw-prose-counters': theme('colors.gray[500]'),
            '--tw-prose-bullets': theme('colors.gray[400]'),
            '--tw-prose-hr': theme('colors.gray[200]'),
            '--tw-prose-quotes': theme('colors.gray[900]'),
            '--tw-prose-quote-borders': theme('colors.blue[300]'),
            '--tw-prose-captions': theme('colors.gray[500]'),
            '--tw-prose-code': theme('colors.indigo[600]'),
            '--tw-prose-pre-code': theme('colors.gray[200]'), // Code block text color (adjust if needed)
            '--tw-prose-pre-bg': theme('colors.gray[800]'),   // Code block background
            '--tw-prose-th-borders': theme('colors.gray[300]'),
            '--tw-prose-td-borders': theme('colors.gray[200]'),
            // Dark mode adjustments (optional, based on your setup)
            '--tw-prose-invert-body': theme('colors.gray[300]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.gray[400]'),
            '--tw-prose-invert-links': theme('colors.blue[400]'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.gray[400]'),
            '--tw-prose-invert-bullets': theme('colors.gray[600]'),
            '--tw-prose-invert-hr': theme('colors.gray[700]'),
            '--tw-prose-invert-quotes': theme('colors.gray[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.blue[700]'),
            '--tw-prose-invert-captions': theme('colors.gray[400]'),
            '--tw-prose-invert-code': theme('colors.indigo[400]'),
            '--tw-prose-invert-pre-code': theme('colors.gray[300]'),
            '--tw-prose-invert-pre-bg': theme('colors.gray[900]'), // Dark code block background
            '--tw-prose-invert-th-borders': theme('colors.gray[600]'),
            '--tw-prose-invert-td-borders': theme('colors.gray[700]'),

            // General styling adjustments
            fontSize: '1rem', // Base font size
            lineHeight: '1.75',
            a: {
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationColor: theme('colors.blue[300]'),
              transition: 'color 0.2s ease-in-out, text-decoration-color 0.2s ease-in-out',
              '&:hover': {
                color: theme('colors.blue[500]'),
                textDecorationColor: theme('colors.blue[500]'),
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              fontWeight: '600',
              marginBottom: '0.8em', // Adjust spacing below headings
            },
            h1: { fontSize: '2.25em' }, // Larger H1
            h2: { fontSize: '1.75em' },
            h3: { fontSize: '1.35em' },
            blockquote: {
              paddingLeft: '1em',
              borderLeftWidth: '0.25rem', // Make border thicker
              fontStyle: 'normal', // Keep it normal style, not italic by default
            },
            'code::before': { content: '""' }, // Remove backticks around inline code
            'code::after': { content: '""' },
            code: {
              backgroundColor: theme('colors.gray[100]'), // Subtle background for inline code
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
              fontSize: '0.9em', // Slightly smaller inline code
            },
            pre: { // Styles for code blocks (```)
              padding: '1.25em', // More padding
              borderRadius: '0.5rem', // More rounded corners
              lineHeight: '1.5',
            },
            'pre code': { // Reset inline code styles within code blocks
              backgroundColor: 'transparent',
              padding: '0',
              borderRadius: '0',
              fontWeight: 'inherit',
              fontSize: 'inherit',
              color: 'inherit', // Inherit from --tw-prose-pre-code
            },
            ul: { paddingLeft: '1.5em' }, // Adjust list indentation
            ol: { paddingLeft: '1.5em' },
            li: { marginTop: '0.4em', marginBottom: '0.4em' }, // Adjust list item spacing
            table: {
              width: '100%',
              fontSize: '0.9em',
            },
            'thead th': {
              fontWeight: '600',
              paddingBottom: '0.75em',
            },
            'tbody td': {
              paddingTop: '0.75em',
              paddingBottom: '0.75em',
            },
          },
        },
        // You could add other named modifiers here like 'guide': { css: { ... } }
      }),
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
