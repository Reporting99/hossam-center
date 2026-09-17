/**
 * Serializes a JSON-LD object for safe embedding inside a script tag (type="application/ld+json")
 * via dangerouslySetInnerHTML.
 *
 * JSON.stringify does not escape the "<" character, so a string value containing a closing
 * script tag could prematurely terminate the script element and allow injection of arbitrary
 * markup if the schema ever includes untrusted input. This escapes "<" (and, defensively, the
 * U+2028/U+2029 line separators that are valid in JSON but not in JS/HTML text) to their
 * unicode escape sequences.
 */
export const serializeJsonLd = (schema: unknown): string => {
  const LT = String.fromCharCode(60);
  const LS = String.fromCharCode(0x2028);
  const PS = String.fromCharCode(0x2029);

  return JSON.stringify(schema)
    .split(LT)
    .join('\\u003c')
    .split(LS)
    .join('\\u2028')
    .split(PS)
    .join('\\u2029');
};
