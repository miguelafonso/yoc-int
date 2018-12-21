import '../styles/app.scss';
import { Main } from './main';
import { PageConfig } from './page-config';

const main = new Main("main");
const config = new PageConfig({
    ipsum: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
    "Tellus pellentesque eu tincidunt tortor. Vitae et leo duis ut. Mattis aliquam faucibus purus in massa tempor nec."
});

main.fillAllElementsWidth(config.defaultConfig!.ipsum);

main.initVideoAddControl();