import React from 'react'
import NavigationBar from '../RegisterPage/NavigationBar'

const FindReservations = () => {
    function capitalize(){
        this.value=this.value.toUpperCase()
    }
    return (
        <div>
            <NavigationBar/>

  <head>
    <meta charset="utf-8" />
    <title>Bootstrap, from Twitter</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <link data-require="bootstrap-css" data-semver="3.3.6" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.css" />
    <link href="style.css" rel="stylesheet" />
  </head>

  <body>
      <div class="input-bar">
        <div class="input-bar-item width100">
          <form>
             <div class="form-group">
                <input class="form-control width100" type='text' 
                placeholder='Ticket Number or Reservation Code(PNR)'
                oninput='capitalize()'></input>
                <input class="form-control width100-2" type='text' placeholder='Passenger LastName'></input>

            </div>
          </form>
        </div>
        <div class="input-bar-item">
          <button class="btn btn-info"><h3>&gt;</h3></button>
        </div>
      </div>
  </body>


</div>
    )
}

export default FindReservations
