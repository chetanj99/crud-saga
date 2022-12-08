import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './views/Home'
import View from './views/Home/action/View'

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App