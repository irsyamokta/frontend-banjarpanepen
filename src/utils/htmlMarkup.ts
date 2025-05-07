import DOMPurify from 'dompurify';

/**
 * Sanitize a HTML string using DOMPurify to prevent XSS attacks,
 * while allowing alignment, style, and class attributes.
 * @param html - The HTML string to sanitize.
 * @returns The sanitized HTML string.
 */
export function sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ['style', 'class', 'align'],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'width', 'height', 'style', 'class', 'align'],
    });
}

/**
 * Create a React {@link dangerouslySetInnerHTML} markup object from sanitized HTML.
 * @param html - The raw HTML string.
 * @returns An object with __html property containing sanitized HTML.
 */
export function createMarkup(html: string) {
    return { __html: sanitizeHtml(html) };
}
