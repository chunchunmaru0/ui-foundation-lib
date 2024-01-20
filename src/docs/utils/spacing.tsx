import React from "react";
import tailwindDefaultConfig from "tailwindcss/defaultConfig.js";
import resolveConfig from "tailwindcss/resolveConfig.js";

type SpacingRecord = Record<string, string>;

const defaultConfig = resolveConfig(tailwindDefaultConfig);

const scale = Object.keys(defaultConfig.theme.spacing)
  .map((name) => {
    const spacingRecord = defaultConfig.theme.spacing as SpacingRecord;
    return {
      name,
      size: spacingRecord[name],
      pixels:
        parseFloat(spacingRecord[name]) *
        (String(spacingRecord[name]).endsWith("rem") ? 16 : 1),
    };
  })
  .sort((a, b) => a.pixels - b.pixels);

export function SpacingScale() {
  return (
    <div className="prose prose-slate dark:prose-dark">
      <div className="text-5xl font-semibold text-red-900">TEST</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Pixels</th>
            <th className="hidden sm:table-cell">
              <span className="sr-only">Preview</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {scale.map(({ name, size, pixels }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{size}</td>
              <td>{pixels}px</td>
              <td className="hidden sm:table-cell">
                <div className="h-4 bg-green-300" style={{ width: size }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
