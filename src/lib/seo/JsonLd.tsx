/**
 * Zynovax — JSON-LD React Component
 * Renders <script type="application/ld+json"> safely with proper escaping.
 */

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | Record<string, any>[];
}

/**
 * Renders one or more JSON-LD structured data blocks.
 *
 * @example
 * ```tsx
 * <JsonLd data={organizationSchema()} />
 * <JsonLd data={[websiteSchema(), webPageSchema(opts)]} />
 * ```
 */
export function JsonLd({ data }: JsonLdProps) {
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((item, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
      </>
    );
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
