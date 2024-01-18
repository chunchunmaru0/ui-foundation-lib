import colorPalette from "tailwindcss/colors";
import { kebabToTitleCase } from "./kebabToTitleCase";
import dlv from "dlv";
import { ColorPalette, ColorItem } from "@storybook/blocks";

export function ColorPaletteReference({ colors }) {
  return (
    <ColorPalette>
      {colors.map((color, i) => {
        let title = Array.isArray(color) ? color[0] : kebabToTitleCase(color);
        let value = Array.isArray(color) ? color[1] : color;

        let palette =
          typeof value === "string"
            ? [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                (variant) => ({
                  name: variant,
                  value: dlv(colorPalette, [value, variant]),
                }),
              )
            : Object.keys(value).map((name) => ({
                name,
                value: value[name],
              }));
        return (
          <ColorItem
            title={title}
            colors={palette.reduce((acc, { name, value }) => {
              acc[name] = value;
              return acc;
            }, {})}
            key={i}
          />
        );
      })}
    </ColorPalette>
  );
}
