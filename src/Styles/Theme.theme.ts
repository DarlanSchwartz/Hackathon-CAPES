import "styled-components";
import { Theme } from "./Theme.types";

declare module "styled-components" {
    export interface DefaultTheme extends Theme { }
}