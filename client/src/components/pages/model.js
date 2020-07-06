import React, { useEffect, useContext, useState } from "react";

export default function ModelPage({ match }) {
  const { qrytype, name, id } = match.params;
  console.log(qrytype);
  console.log(name);
  console.log(id);
  return (
    <div className="row">
      <div className="col-lg-2 col-md-3  col-sm-3 Lsidebar">Lsidebar</div>
      <div className=" col-lg-7 col-md-6 col-sm-6 content">Content</div>
      <div className="col-lg-3 col-md-3 col-sm-3 Rsidebar">Rsidebar</div>
    </div>
  );
}
