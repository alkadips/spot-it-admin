import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = () => {
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA className="mb-4" color="primary" value={26} title="Developers" />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA className="mb-4" color="info" value={6} title="Investors" />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA className="mb-4" color="warning" value={2} title="Farm lands" />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA className="mb-4" color="danger" value={44} title="Plots" />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
