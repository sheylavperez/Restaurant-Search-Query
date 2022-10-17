import './App.css';
import { Container, Dropdown, Form, Label, Segment, Grid,  Header, Button} from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { ReactDatez } from 'react-datez';
import moment from "moment";
import Restaurants from "../src/Data/Restaurant.json";

function App() {
    const [restaurantIds, setRestaurantIds] = useState([]);
    const [fromDate, setFromDate] = useState("2021-04-01");
    
    const submit = () => {
        const input = {
            restaurantIds: restaurantIds,
            fromDate: "2022-10-03T21:37:14.711Z",
            toDate: "2022-10-03T21:37:14.711Z",
            fromHour: 0,
            toHour: 0,
            metricCriteria: [
              {
                "metricCode": "string",
                "compareType": "Equal",
                "value": 0
              }
            ]
          }
    }

    const optionshours = [
      { key: 1, text: '6am', value: 1 },
      { key: 2, text: '7am', value: 2 },
      { key: 3, text: '8am', value: 3 },
      { key: 4, text: '9am', value: 4 },
      { key: 5, text: '10am', value: 5 },
      { key: 6, text: '11am', value: 6 },
      { key: 7, text: '12pm', value: 7 },
      { key: 8, text: '1pm', value: 8 },
      { key: 9, text: '2pm', value: 9 },
      { key: 10, text: '3pm', value: 10 },
      { key: 11, text: '4pm', value: 11 },
      { key: 12, text: '5pm', value: 12 },

    ]
   



    const [metricDefinitions, setMetricDefinitions] = useState([]);
    const [metricCode, setMetricCode] = useState("");

    useEffect(() => {
        getData("https://customsearchquerytoolapi.azurewebsites.net/Search/MetricDefinitions")
            .then(data => {
                setMetricDefinitions(data);
            });
    }, []);

    console.log(metricDefinitions);

    const options = Restaurants.map(r => {
        return {
            key: r.Id,
            value: r.Id,
            text: r.Name
        }
    });

    const metricCodeOptions = metricDefinitions.map(m => {
        return {
            key: m.metricCode,
            value: m.metricCode,
            text: m.alias
        }
    });

      console.log(restaurantIds);
      console.log(metricCode);

  return (
    <Container>

     
      <Grid container style={{ padding: '2em 0em' }}>
        <Grid.Row>
          <Grid.Column>
               <Header as='h1' dividing>
                  Restaurant Search Query
               </Header>
          </Grid.Column>
       </Grid.Row>
    </Grid>


        <Segment>
            <Form>
                <Form.Field>
                    <Dropdown placeholder='Restaurant Ids'
                        fluid
                        multiple
                        selection
                        options={options}
                        value={restaurantIds}
                        onChange={(event, data) => {
                            setRestaurantIds(data.value)
                        }} />
                </Form.Field>
                <Form.Group>
                    <Form.Field>
                        <label>Start Date</label>
                        <ReactDatez
                            name="dateInput"
                            handleChange={(value) => setFromDate(moment(value).format("YYYY-MM-DD"))}
                            value={fromDate}
                            allowPast={true}
                            dateFormat={"MM/DD/YYYY"}
                            placeholder={"MM/DD/YYYY"}
                            startDate={"2021-10-01"}
                            endDate={"2021-10-26"}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>End Date</label>
                        <ReactDatez
                            name="dateInput"
                            handleChange={(value) => setFromDate(moment(value).format("YYYY-MM-DD"))}
                            value={fromDate}
                            allowPast={true}
                            dateFormat={"MM/DD/YYYY"}
                            placeholder={"MM/DD/YYYY"}
                            startDate={"2021-10-01"}
                            endDate={"2021-10-26"}
                        />
                    </Form.Field>
              
                    <Form.Field>
                        <label> From Hours</label>
                        <Dropdown  
                            
                                label='Hours'
                                placeholder='Hours'
                                fluid multiple selection
                                options={optionshours} />

                        </Form.Field>
                     

 
                            <Form.Field>
                            <label> To Hours</label>
                            <Dropdown  
                                
                                    label='Hours'
                                    placeholder='Hours'
                                    fluid multiple selection
                                    options={optionshours} />

                        </Form.Field>
                        </Form.Group>



                <Form.Group>
                    <Form.Field>
                     <label> Metric</label>
                        <Dropdown placeholder='Metric Code'
                        fluid
                        selection
                        options={metricCodeOptions}
                        value={metricCode}
                        onChange={(event, data) => {
                            setMetricCode(data.value)
                        }} />
                    </Form.Field>
                    
                    <Form.Field>
                    <label> Compare Operators</label>
                        <Dropdown placeholder='Metric Code'
                        fluid
                        selection
                        options={metricCodeOptions}
                        value={metricCode}
                        onChange={(event, data) => {
                            setMetricCode(data.value)
                        }} />
                    </Form.Field>

                    <Form.Field>
                    <label> Values</label>
                        <Dropdown placeholder='Metric Code'
                        fluid
                        selection
                        options={metricCodeOptions}
                        value={metricCode}
                        onChange={(event, data) => {
                            setMetricCode(data.value)
                        }} />
                    </Form.Field>

                </Form.Group>
            </Form>

      
         
         <Button primary>Sumbit</Button>


        </Segment>
    </Container>
  );
}

async function getData(url = "") {
    const response = await fetch(url, {
        method: "GET",
        cache: "no-cache"
    });

    return response.json();
}

export default App;