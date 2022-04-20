import Form from "react-bootstrap/Form";
import "./CreateContent.css";

function CreateContent() {
  return (
    <div>
      <div className="content-form">
        <h1>Skriv en recension</h1>
        <Form action="">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Titel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Resemål/Aktivitet/Restaurang"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Pris</Form.Label>
            <div className="pris">
              <Form.Control type="number" pattern="[0-9]*" />{" "}
              <Form.Control
                style={{ width: "3rem" }}
                type="text"
                placeholder="Kr"
                disabled
                readOnly
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Beskriving</Form.Label>
            <Form.Control as="textarea" rows={7} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Bild</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <button type="submit" className="btn btn-primary">
            Skapa annons
          </button>
        </Form>
      </div>
    </div>
  );
}

export default CreateContent;
