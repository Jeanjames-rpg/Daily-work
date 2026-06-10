import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const [page, setPage] = useState([1]);

  const [selectedItem, setSelectedItem] = useState(null);

  function loaddata(pageNumber = page){

    fetch(`http://127.0.0.1:8000/csv/?page=${pageNumber}`)

    .then(res => res.json())
    .then(result => {

      setData(result.data);

      setPage(pageNumber);
    })

    .catch(error => {

      console.log(error);
    });

  }

  function nextPage() {
    loaddata(page+1);
  }

  function prevPage() {
    if (page > 1) {
      loaddata(page - 1)
    }
  }

  return (

    <div className='container'>
      <h1>CSV API REACT</h1>

    <div className='buttons'>

      <button onClick={()=> loaddata()}>SHOW</button>

      <button onClick={nextPage}>NEXT</button>

      <button onClick={prevPage}>PREVIOUS</button>

    </div>

      <table border={1}>

        <thead>
          <tr>
            <th>Customer_ID</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Loyalty_Member</th>
            <th>Product_Type</th>
            <th>Action</th>
            {/* <th>SKU</th>
            <th>Rating</th>
            <th>Order_Status</th>
            <th>Payment_Method</th>
            <th>Total_Price</th>
            <th>Unit_Price</th>
            <th>Quantity</th>
            <th>Purchase_Date</th>
            <th>Shipping_Type</th>
            <th>Add-ons_Purchased</th>
            <th>Add-on_Total</th> */}


          </tr>
        
        </thead>

        <tbody>

          {data.map((item, index)=>(
            <>

            <tr key={index}>
              <td>{item["Customer ID"]}</td>
              <td>{item["Age"]}</td>
              <td>{item["Gender"]}</td>
              <td>{item["Loyalty Member"]}</td>
              <td>{item["Product Type"]}</td>
              {/* <td>{item["SKU"]}</td>
              <td>{item["Rating"]}</td>
              <td>{item["Order Status"]}</td>
              <td>{item["Payment Method"]}</td>
              <td>{item["Total Price"]}</td>
              <td>{item["Unit Price"]}</td>
              <td>{item["Quantity"]}</td>
              <td>{item["Purchase Date"]}</td>
              <td>{item["Shipping Type"]}</td>
              <td>{item["Add-ons Purchased"]}</td>
              <td>{item["Add-on Total"]}</td> */}

              <td>
                <button 
                onClick={()=>
                  setSelectedItem(
                    selectedItem === index ? null : index
                  )
                }
                >
                  {selectedItem === index ? "Hide":"View"}
                </button>

              </td>


            </tr>

            {selectedItem === index &&(
              <tr>
                <td colSpan="5">

                  <div className='details'>

                    <p><b>SKU:</b>{item['SKU']}</p>
                    <p><b>Rating:</b>{item['Rating']}</p>
                    <p><b>Order_Status:</b>{item['Order Status']}</p>
                    <p><b>Payment Method:</b>{item['Payment Method']}</p>
                    <p><b>Total Price:</b>{item['Total Price']}</p>
                    <p><b>Unit Price:</b>{item['Unit Price']}</p>
                    <p><b>Purchase Date:</b>{item['Purchase Date']}</p>
                    <p><b>Shipping Type:</b>{item['Shipping Type']}</p>
                    <p><b>Add-ons Purchased:</b>{item['Add-ons Purchased']}</p>
                    <p><b>Add-on Total:</b>{item['Add-on Total']}</p>
                    <p><b>Quantity:</b>{item['Quantity']}</p>
                  
                  
                  </div>
                
                
                
                
                </td>
              
              
              </tr>


            )}

            </>

          ))}



        </tbody>


      </table>

    </div>
  );

}

export default App;
