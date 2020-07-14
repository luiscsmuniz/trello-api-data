import React from "react";
import Table from "./Table";
import Charts from "./Charts";

const View = ({ view, board_id, labels }) => {
  if (view === "table") return <Table board_id={board_id} labels={labels} />;
  if (view === "chart") return <Charts board_id={board_id} labels={labels} />;

  return null;
};

export default View;
