import { Radar } from "react-chartjs-2";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function Detail() {
  const location = useLocation();
  let data = location.state || null;

  let chartData = {};
  if (data !== null) {
    data = data.userData;
    const skillSet = data.skillSet;
    chartData = {
      labels: Object.keys(skillSet),
      datasets: [
        {
          label: "Skill Set",
          data: Object.values(skillSet),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
        },
      ],
    };
  }
  return (
    <>
      {data && (
        <Container className="mt-5">
          <Row>
            <Col>
              <h1>{data.name}</h1>
              <img src={data.avatar}  style={{backgroundColor:"white", borderRadius:"50%"}}/>
              <h3>{data.position}</h3>
            </Col>

            <Col>
              <h2>Skills</h2>
              <Container style={{ width: "800px"  }}>
                <Radar data={chartData} style={{backgroundColor:"white", borderRadius:10}} />
              </Container>
            </Col>
          </Row>
        </Container>
      )}
      {data == null && <h1>Please login first</h1>}
    </>
  );
}
export default Detail;
