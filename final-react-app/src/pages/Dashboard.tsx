import DataTable from '../components/DataTable'
import MyComponent from '../components/MyComponent'

function Dashboard() {
  return (
    <div className='form'>
      <div className='m-10'>
      <MyComponent />
      </div>
      <DataTable />
        
    </div>
  )
}

export default Dashboard