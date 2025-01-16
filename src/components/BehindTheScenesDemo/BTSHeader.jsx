import { log } from './log.js';
import logoImg from './assets/logo.png';

export default function BTSHeader() {
  log('<BTSHeader /> rendered', 1);

  return (
    <header id="bts-main-header">
      <img src={logoImg} alt="Magnifying glass analyzing a document" />
      <h1>React - Behind The Scenes</h1>
    </header>
  );
}
