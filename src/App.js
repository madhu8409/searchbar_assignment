import React from 'react';
import { useState, useEffect } from 'react';
import { AccessProductServices } from './Service'
import { makeStyles } from "@material-ui/core";
// import SearchAppBar from './components/SearchAppBar';

const AccessProductService = new AccessProductServices();
const searchBarStyle = makeStyles({
  documentsSearchInputBox: {
    marginTop: 25,
    alignItems: 'center',
    maxWidth: '350px',
    height: 37,
    paddingLeft: 10,
    border: '1px solid #DEDEDF',
    borderRadius: 12,
    margin: '0px 20px',
    background: '#FFFFFF 0% 0% no-repeat padding-box',

    '&:hover::before': {
      borderBottom: 'unset',
      transition: 'unset',
    },

    '&::before': {
      borderBottom: 'unset',
      transition: 'unset',
    },

    '& input': {
      padding: 'unset',
    },
  },
});

const App = () => {
  const { search } = window.location;
  const [apiResponse, setapiResponse] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [topSearchSuggestions, setTopSearchSuggestions] = useState([])
  const [topCollection, setTopCollection] = useState([])
  const styles = searchBarStyle();
  useEffect(() => {
    getProductDetails()
    getProductSuggestionsDetails()
    getProductTopCollection()
  }, [searchQuery])

  const getProductDetails = async () => {
    const response = await AccessProductService.getAllProducts(searchQuery);
    setapiResponse(response.data.results)
  }

  const getProductSuggestionsDetails = async () => {
    const response = await AccessProductService.getAllProducts(searchQuery);
    setTopSearchSuggestions(response.data.suggestions)
  }

  const getProductTopCollection = async () => {
    const response = await AccessProductService.getAllProducts(searchQuery);
    let tempCollection = []
    response.data.facets['collectionname']?.map(data => {
      tempCollection.push(data.name)
    })
    setTopCollection(tempCollection)
  }


  const filterPosts = apiResponse.filter((item) => {
    if (item.productname.toLowerCase().includes(searchQuery)) {
      return item
    }
  })


  const topSearchSuggestion = topSearchSuggestions.filter((item) => {
    if (item.suggestion.toLowerCase().includes(searchQuery)) {
      return item
    }
  })

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }



  return (
    <div>
      <div style={{ width: "100%" }}>
        <form class="form-inline my-2 my-lg-0" >
          <h4 style={{ width: "30%", marginTop: "100px", marginLeft: "100px" }} >Search your Product Here</h4>
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={handleSearch}
            onMouseDown={handleSearch}
            autoComplete="off"
            style={{ width: "30%", marginLeft: "100px" }} />
        </form>

        <div class="col-md-3 col-lg-3 col-xl-3" style={{ marginTop: "25px" }}>
          {searchQuery ? <div class="card shadow-sm p-3 mb-5 bg-black rounded" style={{ border: "2px" }}>
          <h4 style={{ marginLeft: "100px" }}>Top Search</h4>
            {topSearchSuggestion?.map(topSearchSuggestions => (
              <div>
              
              <p style={{ marginLeft: "100px" }} key={topSearchSuggestions.key}>{topSearchSuggestions.suggestion}</p>
              </div> ))}
              <h4 style={{ marginLeft: "100px", marginTop:"12px" }}>Top Collection</h4>
              {topCollection?.map(topCollection => (
              <p style={{ marginLeft: "100px" }} key={topCollection.key}>{topCollection}</p>
            ))}
          </div> 
          : ""}
        </div>

        <div class="col-md-9 col-lg-9 col-xl-9">
          <div style={{ paddingLeft: 100, paddingRight: 100 }}>
            {searchQuery ? <div class="card shadow-sm p-3 mb-5 bg-black rounded" style={{ border: "2px" }}>
              <div class="row">
                {filterPosts?.map(apiResponse => (
                  <div class="col-sm-4" style={{ padding: "25px" }}>
                    <div class="card shadow p-3 mb-5 rounded" style={{ width: "18rem%", border: "2px" }}>
                      <div class="card-body" >
                        <img class="card-img-top" src={apiResponse.productimage} style={{ width: "200px" }} alt="Card image cap" />
                        <p key={apiResponse.key}>{apiResponse.productname}</p>
                        <div style={{ display: "flex" }}>
                          <p style={{ color: "blue" }}>Rs. {apiResponse.pricewithoutdiscount}</p>
                          <p key={apiResponse.key} style={{ textDecoration: "line-through", marginLeft: "20px" }}>Rs. {apiResponse.mrpprice}</p>
                        </div>

                      </div>
                    </div>
                  </div>))}
              </div>
            </div> : ""}
          </div>
        </div>




      </div>

    </div>
  )
}

export default App
