import React from "react";
import "../../assets/styles/app.css";
import multas from "../../assets/data/multas.json"; // Importing the JSON file
import { Margin } from "@mui/icons-material";

const ReglamentoJuez = () => {
  return (
    <div className="view-container">
      <main className="main-content tt">
        <h1 className="title">Reglamento Juez</h1>

        {/* Table Wrapper for Scroll */}
        <div className="table-container">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Categoría</th>
                <th>Artículo</th>
                <th>Conducta</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {multas.map((multa) => (
                <tr key={multa.id}>
                  <td>{multa.id}</td>
                  <td>{multa.category}</td>
                  <td>{multa.law}</td>
                  <td>{multa.conduct}</td>
                  <td>${multa.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ReglamentoJuez;

