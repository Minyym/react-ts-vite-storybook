import React from "react";

import styles from "./App.module.css";
import MenuDemo from "./components/Menu/demo";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <h1>Menu 组件示例</h1>
      <MenuDemo />
    </div>
  );
};

export default App;
