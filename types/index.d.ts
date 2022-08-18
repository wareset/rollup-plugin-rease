import { FilterPattern } from '@rollup/pluginutils';
declare const _default: ({ env, debug, extensions, include, exclude, }?: {
    env?: "client" | "server";
    debug?: boolean | ((path: string) => boolean);
    extensions?: string[];
    include?: FilterPattern;
    exclude?: FilterPattern;
}) => any;
export default _default;
