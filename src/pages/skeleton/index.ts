import "@LISS/pages/skeleton/base/";
import "@ChartsHTML/chart-playground/";

import { initMenu } from "@LISS/components/page/menu";

// @ts-ignore
import menu  from "!!raw-loader!/src/pages/content.txt";
initMenu(menu);