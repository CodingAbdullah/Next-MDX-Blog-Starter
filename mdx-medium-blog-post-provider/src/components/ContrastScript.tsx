import { CONTRAST_ATTRIBUTE, CONTRAST_HIGH, CONTRAST_STORAGE_KEY } from "@/utils/constants";

// Runs before first paint so high contrast never flashes in after hydration.
// A stored choice wins; otherwise the OS "increase contrast" setting is honoured.
const CONTRAST_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(CONTRAST_STORAGE_KEY)});if(s===${JSON.stringify(CONTRAST_HIGH)}||(s===null&&window.matchMedia("(prefers-contrast: more)").matches)){document.documentElement.setAttribute(${JSON.stringify(CONTRAST_ATTRIBUTE)},${JSON.stringify(CONTRAST_HIGH)})}}catch(e){}})();`;

// Contrast Script custom component
export default function ContrastScript(): React.JSX.Element {
    return <script dangerouslySetInnerHTML={{ __html: CONTRAST_INIT_SCRIPT }} />;
}
