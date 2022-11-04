import './App.css';
import { Container, Dropdown, Form,Pagination, Icon,Segment, Grid,  Header, Button, Input, Table} from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { ReactDatez } from 'react-datez';
import moment from "moment";
import Restaurants from "../src/Data/Restaurant.json";

function App() {
    const [restaurantIds, setRestaurantIds] = useState([]);
    const [fromDate, setFromDate] = useState("2021-10-01");
    const [toDate, settoDate] = useState("2021-10-15");
    const [fromHour,setfromHour ] = useState(6);
    const [toHour,settoHour ] = useState(29);
    const [transactionDataState, setTransactionsDataState] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [metricCode,setmetricCode ] = useState("");
    const [metricDefinitions, setMetricDefinitions] = useState([]);
    const [CompareType,setCompareType ] = useState("");
    const [value,setValue ] = useState(0);
    const [metricCriteria,  setMetricCriteria] = useState([{
        "metricCode": "string",
        "compareType":"string",
        "value": 0

    }]);

    

    const handleMetricChange = (prop, index, value) => {
        const newArray = [...metricCriteria];
        metricCriteria[index][prop] = value;
    
    
        setMetricCriteria(newArray);
    
      }



    const submit = () => {
     
        const input = {
            restaurantIds: restaurantIds,
            fromDate: fromDate,
            toDate: toDate,
            fromHour:fromHour,
            toHour: toHour,
            metricCriteria: metricCriteria
        
          }
  
    postData("https://customsearchquerytoolapi.azurewebsites.net/Search/Query", input)
        .then(data => {
        setTransactionsDataState(data);
    });
      
     
    }

    const optionshours = [
      { key: 1, text: '6am', value: 6 },
      { key: 2, text: '7am', value: 7 },
      { key: 3, text: '8am', value: 8 },
      { key: 4, text: '9am', value: 9 },
      { key: 5, text: '10am', value: 10 },
      { key: 6, text: '11am', value: 11 },
      { key: 7, text: '12pm', value: 12 },
      { key: 8, text: '1pm', value: 13 },
      { key: 9, text: '2pm', value: 14},
      { key: 10, text: '3pm', value: 15 },
      { key: 11, text: '4pm', value: 16 },
      { key: 12, text: '5pm', value: 17 },
      { key: 13, text: '6pm', value: 18 },
      { key: 14, text: '7pm', value: 19 },
      { key: 15, text: '8pm', value: 20},
      { key: 16, text: '9pm', value: 21 },
      { key: 17, text: '10pm', value: 22 },
      { key: 18, text: '11pm', value: 23 },
      { key: 19, text: '12am', value: 24},
      { key: 20, text: '1am', value: 25},
      { key: 21, text: '2am', value: 26},
      { key: 22, text: '3am', value: 27},
      { key: 23, text: '4am', value: 28},
      { key: 24, text: '5am', value: 29},





    ]
    const compareOperators = [
        { key: 1, text: '≤', value: 'LessThanOrEqual' },
        { key: 2, text: '<', value: 'LessThan' },
        { key: 3, text: '=', value: 'Equal' },
        { key: 4, text: '>', value: "GreaterThan" },
        { key: 5, text: '≥', value: "GreaterThanOrEqual" },
        

      ]
     


 
    useEffect(() => {
        getData("https://customsearchquerytoolapi.azurewebsites.net/Search/MetricDefinitions")
            .then(data => {
                setMetricDefinitions(data);
            });
    }, []);


        console.log(activePage);
    

    

    const handlePaginationChange = (pageNumber) => {
        setActivePage(pageNumber);

    }

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


      const start_index = (activePage-1) * 20;
      const end_index = activePage * 20 -1 ;
      const transactionDataPaginated =  transactionDataState.slice(start_index, end_index);
    
      const found = Restaurants.find(obj => {
        return obj.id === 1;
      });
      console.log(found);
 

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
            <Form onSubmit={() => submit()}>
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
                            handleChange={(value) => settoDate(moment(value).format("YYYY-MM-DD"))}
                            value={toDate}
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
                                fluid selection
                                options={optionshours}
                                value={fromHour}
                                onChange={(event, data) => {
                                setfromHour(data.value)
                        }}
                                />

                        </Form.Field>
                     

 
                            <Form.Field>
                            <label> To Hours</label>
                            <Dropdown  
                                
                                    label='Hours'
                                    placeholder='Hours'
                                    fluid selection
                                    options={optionshours}
                                    value={toHour}
                                    onChange={(event, data) => {
                                    settoHour(data.value)
                                    }}/>

                        </Form.Field>
                        </Form.Group>

            {metricCriteria.map((data, index) => {


                    return (
                    <>
                <Form.Group>
                    
                    <Form.Field>
                        
                     <label> Metric</label>
                        <Dropdown placeholder='Metric Code'
                        fluid
                        selection
                        options={metricCodeOptions}
                        value={data[index]}
                        onChange={(event, data) => {
                           handleMetricChange("metricCode", index, data.value);
                           }} />
                    </Form.Field>


                    <Form.Field>
                    <label> Compare Operators</label>
                        <Dropdown placeholder='Compare Operators'
                        fluid
                        selection
                        options={compareOperators}
                        value={data[index]}
                      onChange={(event, data) => {
                        handleMetricChange("compareType", index, data.value);
                      }}
                     />
                    </Form.Field>

                    <Form.Field>
                    <label> Values</label>
                    <Input placeholder='Value' 
                        value={data[index]}
                        onChange={(event, data) => {
                            handleMetricChange("value", index, Number.parseInt(data.value));
                          }}/>
                       
                    </Form.Field>

                </Form.Group>
</>
            )


          })}

                {metricCriteria.length >= metricCodeOptions.length ? <p></p> :
                <Form.Field>
                <label>Add Criteria</label>

    
                <Button type="button" color='pink'  onClick={(event, data) => {
                          const newMetricCriteria = [];
                          for (var i = 0; i < metricCriteria.length; i++){
                              newMetricCriteria.push(metricCriteria[i])
                          }
                          newMetricCriteria.push( {metricCode:"string", compareType:"string", value:0} );
                          setMetricCriteria(newMetricCriteria)
                      }}>Add Criteria</Button>


                <Button type = "sumbit" primary>Sumbit</Button>
            </Form.Field>
                    }
            </Form>
        </Segment>

        <Segment>
        <Table celled>
            
                <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                Restaurant
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Business Date
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Order number
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Order time
                            </Table.HeaderCell>
                            {metricDefinitions.map(md => {
                                return (<Table.HeaderCell>
                                    {md.alias}
                                </Table.HeaderCell>);
                            })}
                        </Table.Row>
                </Table.Header>
                {transactionDataState.length === 0 ? <p>There are no results!</p> :
                    <React.Fragment>

                <Table.Body>
          

                {transactionDataPaginated.map(d => {
                                return (<Table.Row>
                                    <Table.Cell>
                                    {Restaurants.map(rest => {
                                    if (rest.Id === d.restaurantId) {
                                    return (
                                        rest.Name
                                    );
                                    }
                                })}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {d.busDt.toString("MM/DD/YYYY")}
                                    </Table.Cell>
                                    <Table.Cell>
                                         {d.orderNumber}
                                    </Table.Cell>
                                    <Table.Cell>
                                    {d.orderTime.toString("hh:mm:ss")}
                                    </Table.Cell>
                                    {metricDefinitions.map(m => {
                                        
                                        const metricCodeName = m.metricCode.charAt(0).toLowerCase() + m.metricCode.slice(1);
                                       
                                        return (<Table.Cell>
                                                    {formatData(d[metricCodeName], m)}
                                                </Table.Cell>);
                                    })}
                                </Table.Row>);
                            })}

                            

                </Table.Body>
                <Table.Footer>
                            <Table.Row>
                            <Table.HeaderCell colSpan='3'>
                                <Pagination

        
                                  activePage={activePage}
                                  onPageChange={(event, data) => handlePaginationChange(data.activePage)}
                                  totalPages={Math.ceil(transactionDataState.length / 20)}
                                ></Pagination>
                            </Table.HeaderCell>
                            </Table.Row>
                    </Table.Footer>
                  </React.Fragment>
                    }              

            </Table>
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

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

function formatData(value, metricDefinition) {
    let formattedValue = "";
    
    switch (metricDefinition.dataType) {
        case "Money":
            formattedValue = `$${value.toFixed(metricDefinition.decimalPlaces)}`;
            break;

            case "Percent":
                formattedValue = `${(value * 100).toFixed(metricDefinition.decimalPlaces)}%`
                break;
            case "Number":
                formattedValue = value.toFixed(metricDefinition.decimalPlaces)
                break;
    
            default:
                break;
        }

    return formattedValue;
}


export default App;