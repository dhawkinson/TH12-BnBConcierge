// Pitch.js
//**********************************************************************
//*****  Client side -- frontend/src/components/landing/Pitch.js   *****
//*****  This is the pitch component of the Landing Page           *****
//*****  It is on the first page the user sees.                    *****
//**********************************************************************

import React from 'react'

import { Card, CardContent, List, ListItem, Typography } from '@material-ui/core'

const Pitch = () => {

  return (

    <Card
      className='pitch'
      elevation={ 0 }
      style={{
        width: '145%',
          backgroundColor: 'transparent',
          boxShadow: 'none',
      }}
    >
      <CardContent className='pitch-content'>
        <Typography
          variant='h5'
          align='left'
        >
          Convenient, yet set apart!
        </Typography>

        <Typography
          variant='h6'
          align='left'
        >
          Some close by venues and attractions:
        </Typography>
        
        <List>
          <ListItem className='list-item primary'>26 min SW of SeaTac Airport, away from the flight path</ListItem>
          <ListItem className='list-item primary'>23 min to Southcenter Mall</ListItem>
          <ListItem className='list-item primary'>27 min to Chihuly Bridge of Glass (Tacoma)</ListItem>
          <ListItem className='list-item primary'>30 min to Washington State Fairgrounds (Puyallup)</ListItem>
          <ListItem className='list-item primary'>35 min (or less) to entertainment venues:</ListItem>
          <ListItem className='list-item secondary' style={{ paddingLeft: '5.5%' }}>Emerald Downs Racetrack</ListItem>
          <ListItem className='list-item secondary' style={{ paddingLeft: '5.5%' }}>Showare Center</ListItem>
          <ListItem className='list-item secondary' style={{ paddingLeft: '5.5%' }}>Tacoma Dome</ListItem>
          <ListItem className='list-item secondary' style={{ paddingLeft: '5.5%' }}>Muckleshoot/Emerald Queen Casinos</ListItem>
          <ListItem className='list-item secondary' style={{ paddingLeft: '5.5%' }}>White River Amphitheater</ListItem>
          <ListItem className='list-item secondary' style={{ paddingLeft: '5.5%' }}>Century Link Field/T-Mobile Park</ListItem>
          <ListItem className='list-item primary'>45 min to Pike Place Market (Downtown Seattle)</ListItem>
          <ListItem className='list-item primary'>45 min to South Lake Union (Amazon, Facebook, Google)</ListItem>
          <ListItem className='list-item primary'>45 min to Microsoft, Redmond Way (off hour times)</ListItem>
          <ListItem className='list-item primary'>60 min to Northwest Trek Wildlife Park</ListItem>
          <ListItem className='list-item primary'>65 min to Snoqualmie Pass Ski Area</ListItem>
          <ListItem className='list-item primary'>85 min to Mt. Rainier National Park</ListItem>
          <ListItem className='list-item primary'>102 min to Crystal Mountain Ski Area</ListItem>
          <ListItem className='list-item primary'>180 min to Olympic National Park (Kalaloch Lodge)</ListItem>
        </List>
      </CardContent>
    </Card>

  )

}

export default Pitch