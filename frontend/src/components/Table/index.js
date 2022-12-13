import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  faAngleUp,
  faHeart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { coin, data } from "../../cryptoSlice";
import ReactPaginate from "react-paginate";
import "./style.css";

const selectBox = [10, 20, 50, 100];

const Tablez = () => {
  const [tag, setTag] = useState("");
  const [convert, setConvert] = useState("");
  const [numberRow, setNumberRow] = useState(10);
  const [inputSearch, setInputSearch] = useState("");
  const dataz = useSelector(data);
  const coinz = useSelector(coin);
  const [watchList, setWatchList] = useState([]);
  const [toggleWatchList, setToggleWatchList] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [listActive, setListActive] = useState([]);

  const [dataInit, setDataInit] = useState([]);
  const [listTag, setListTag] = useState([]);
  const [changeSortPrice, setChangeSortPrice] = useState(true);
  const [changeSortId, setChangeSortId] = useState(true);
  const [changeSortName, setChangeSortName] = useState(true);
  const [changeSort24h, setChangeSort24h] = useState(true);
  const [changeSort7d, setChangeSort7d] = useState(true);
  const [changeSortMarket, setChangeSortMarket] = useState(true);
  const [changeSort24hVolum, setChangeSort24hVolum] = useState(true);
  const [changeSortCirculing, setChangeSortCirculing] = useState(true);

  useEffect(() => {
    const newArray = dataz.map((item) => item.tags).flat();

    setDataInit(dataz);
    setListTag([...new Set(newArray)]);
  }, [dataz]);

  useEffect(() => {
    if (toggleWatchList) {
      setDataInit(watchList);
      setItemOffset(0);
    } else {
      setDataInit(dataz);
      setItemOffset(0);
    }
  }, [toggleWatchList]);

  const handleChangeTag = (event) => {
    setTag(event.target.value);
    setDataInit(dataz);
    setDataInit(dataz.filter((item) => item.tags.includes(event.target.value)));
    setItemOffset(0);

    if (event.target.value === null) setDataInit(dataz);
  };

  const handleChangeMaxRow = (e) => {
    setNumberRow(e.target.value);
  };

  const handleChangeConvert = (event) => {
    setConvert(event.target.value);
  };
  const handleOpenTab = (slug) => {
    window.open(`https://coinmarketcap.com/currencies/${slug}`, "_blank");
  };

  const handleWatchList = () => {
    setToggleWatchList(!toggleWatchList);
  };

  const handleSortPrice = () => {
    const copyListResult = [...dataInit];
    setChangeSortPrice(!changeSortPrice);
    copyListResult.sort((a, b) =>
      changeSortPrice
        ? a.quote.USD.price - b.quote.USD.price
        : b.quote.USD.price - a.quote.USD.price
    );
    setDataInit(copyListResult);
  };

  const handleSortId = () => {
    const copyListResult = [...dataInit];
    setChangeSortId(!changeSortId);
    copyListResult.sort((a, b) => (changeSortId ? a.id - b.id : b.id - a.id));
    setDataInit(copyListResult);
  };

  const handleSortName = () => {
    const copyListResult = [...dataInit];
    setChangeSortName(!changeSortName);
    copyListResult.sort((a, b) =>
      changeSortName
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setDataInit(copyListResult);
  };

  const handleSort24h = () => {
    const copyListResult = [...dataInit];
    setChangeSort24h(!changeSort24h);
    copyListResult.sort((a, b) =>
      changeSort24h
        ? a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h
        : b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h
    );
    setDataInit(copyListResult);
  };

  const handleSort7d = () => {
    const copyListResult = [...dataInit];
    setChangeSort7d(!changeSort7d);
    copyListResult.sort((a, b) =>
      changeSort7d
        ? a.quote.USD.percent_change_7d - b.quote.USD.percent_change_7d
        : b.quote.USD.percent_change_7d - a.quote.USD.percent_change_7d
    );
    setDataInit(copyListResult);
  };

  const handleSortMarket = () => {
    const copyListResult = [...dataInit];
    setChangeSortMarket(!changeSortMarket);
    copyListResult.sort((a, b) =>
      changeSortMarket
        ? a.quote.USD.market_cap - b.quote.USD.market_cap
        : b.quote.USD.market_cap - a.quote.USD.market_cap
    );
    setDataInit(copyListResult);
  };

  const handleSort24hVolume = () => {
    const copyListResult = [...dataInit];
    setChangeSort24hVolum(!changeSort24hVolum);
    copyListResult.sort((a, b) =>
      changeSort24hVolum
        ? a.quote.USD.volume_24h - b.quote.USD.volume_24h
        : b.quote.USD.volume_24h - a.quote.USD.volume_24h
    );
    setDataInit(copyListResult);
  };

  const handleSortCirculing = () => {
    const copyListResult = [...dataInit];
    setChangeSortCirculing(!changeSortCirculing);
    copyListResult.sort((a, b) =>
      changeSortCirculing
        ? a.circulating_supply - b.circulating_supply
        : b.circulating_supply - a.circulating_supply
    );
    setDataInit(copyListResult);
  };

  const filterSearch = dataInit.filter(
    (item) =>
      item.name.toLowerCase().includes(inputSearch.toLowerCase()) ||
      item.symbol.toLowerCase().includes(inputSearch.toLowerCase())
  );

  const endOffset = itemOffset + numberRow;
  const currentItems = filterSearch.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filterSearch.length / numberRow);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * numberRow) % filterSearch.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="table">
      <div className="header-table">
        <div className="search-name-wrapper">
          <input
            className="search"
            placeholder="Search by coin name or symbol"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <FontAwesomeIcon className="glass-icon" icon={faMagnifyingGlass} />
        </div>
        <div className="filter-by-tag">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Filter by tag
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tag}
                label="Filter by tag"
                onChange={handleChangeTag}
              >
                <MenuItem value={null}>ALL</MenuItem>
                {listTag.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>

        <div className="convert-currency">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Convert currency
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={convert}
                label="Filter by tag"
                onChange={handleChangeConvert}
              >
                {coinz.map((item) => (
                  <MenuItem value={item}>{item.symbol}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="select-number">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Number
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={numberRow}
                label="Filter by tag"
                onChange={handleChangeMaxRow}
              >
                {selectBox.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="confirm-filter" onClick={handleWatchList}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
      <div className="table-wrapper">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <FontAwesomeIcon icon={faAngleUp} onClick={handleSortId} /> #
                </TableCell>
                <TableCell>
                  <FontAwesomeIcon icon={faAngleUp} onClick={handleSortName} />{" "}
                  Name
                </TableCell>
                <TableCell>
                  <FontAwesomeIcon icon={faAngleUp} onClick={handleSortPrice} />{" "}
                  Price
                </TableCell>
                <TableCell>
                  <FontAwesomeIcon icon={faAngleUp} onClick={handleSort24h} />{" "}
                  24h%
                </TableCell>
                <TableCell>
                  <FontAwesomeIcon icon={faAngleUp} onClick={handleSort7d} />{" "}
                  7d%
                </TableCell>
                <TableCell>
                  <FontAwesomeIcon
                    icon={faAngleUp}
                    onClick={handleSortMarket}
                  />{" "}
                  Market Cap
                </TableCell>
                <TableCell>
                  <FontAwesomeIcon
                    icon={faAngleUp}
                    onClick={handleSort24hVolume}
                  />{" "}
                  Volume(24h)
                </TableCell>
                <TableCell>
                  <FontAwesomeIcon
                    icon={faAngleUp}
                    onClick={handleSortCirculing}
                  />{" "}
                  Circuling Supply
                </TableCell>
                <TableCell>Last 7 Days</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <FontAwesomeIcon
                      className={
                        listActive.includes(row.id)
                          ? "heartIconActive"
                          : "heartIcon"
                      }
                      icon={faHeart}
                      onClick={() => {
                        if (listActive.includes(row.id)) {
                          setListActive(
                            listActive.filter((item) => item !== row.id)
                          );

                          setWatchList(
                            watchList.filter((item) => item.id !== row.id)
                          );
                        } else {
                          setWatchList([...new Set([...watchList, row])]);
                          setListActive([...new Set([...listActive, row.id])]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => handleOpenTab(row.slug)}
                  >
                    {row.id}
                  </TableCell>
                  <TableCell onClick={() => handleOpenTab(row.slug)}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        className="icon"
                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${row.id}.png`}
                        alt=""
                      />
                      <span>{row.name}</span>
                    </div>
                  </TableCell>
                  <TableCell onClick={() => handleOpenTab(row.slug)}>
                    {row.quote.USD.price.toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={
                      row.quote.USD.percent_change_24h.toFixed(2).includes("-")
                        ? "C24h-"
                        : "C24h"
                    }
                    onClick={() => handleOpenTab(row.slug)}
                  >
                    {row.quote.USD.percent_change_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell
                    className={
                      row.quote.USD.percent_change_7d.toFixed(2).includes("-")
                        ? "C7d-"
                        : "C7d"
                    }
                    onClick={() => handleOpenTab(row.slug)}
                  >
                    {row.quote.USD.percent_change_7d.toFixed(2)}%
                  </TableCell>
                  <TableCell onClick={() => handleOpenTab(row.slug)}>
                    ${row.quote.USD.market_cap}
                  </TableCell>
                  <TableCell onClick={() => handleOpenTab(row.slug)}>
                    ${row.quote.USD.volume_24h}
                  </TableCell>
                  <TableCell onClick={() => handleOpenTab(row.slug)}>
                    {row.circulating_supply}
                  </TableCell>
                  <TableCell onClick={() => handleOpenTab(row.slug)}>
                    <img
                      src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${row.id}.svg`}
                      alt=""
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="pagination">
        {currentItems.length < 100 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< "
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </div>
  );
};

export default Tablez;
