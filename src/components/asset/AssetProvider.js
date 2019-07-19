import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Preloader from '../layout/Preloader';
import { getAssets } from '../../actions/logActions';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const AssetProvider = ({ log: { assets, loading }, getAssets }) => {
  const [tbldata, setTbldata] = useState([]);
  const [coldata, setColdata] = useState([]);
  const [chkloop, setChkLoop] = useState(1);

  useEffect(() => {
    getAssets();
    // eslint-disable-next-line
  }, []);

  const populate = () => {
    setTbldata(assets);
    setColdata(
      Object.keys(assets[0]).map(key => {
        return {
          Header: key,
          accessor: key
        };
      })
    );
  };

  if (loading || assets === null) {
    return <Preloader />;
  } else {
    if (chkloop <= 1) {
      populate();
      setChkLoop(2);
    }
  }

  return (
    <div>
      {assets.length === 0 ? (
        <p className="center">No data to show ...</p>
      ) : (
        <ReactTable
          data={tbldata}
          columns={coldata}
          defaultPageSize={10}
          className="-striped -highlight"
          //getTrProps={ClickRow}
        />
      )}
    </div>
  );
  // <ul className="collection with-header">
  //   <li className="collection-header">
  //     <h4 className="center">TABLE DATA</h4>
  //   </li>
  //   {!loading && assets.length === 0 ? (
  //     <p className="center">No data to show ...</p>
  //   ) : (
  // assets.map(asset => (
  //   <ul>
  //     <li key={asset.UserID}>{asset.UserName} </li>
  //   </ul>
  // ))

  // <table>
  //   <tr>
  //     <th>Company</th>
  //     <th>Contact</th>
  //     <th>Country</th>
  //   </tr>
  //   <tr>
  //     {assets.map(asset => (
  //       <td>{asset.UserID} </td>
  //       // <td>{asset.UserName} </td>
  //       // <td >{asset.Password} </td>
  //     ))}
  //   </tr>
  // </table>
  // <AssetTable assets={assets} />
  // )}
  //</ul>
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(
  mapStateToProps,
  { getAssets }
)(AssetProvider);
