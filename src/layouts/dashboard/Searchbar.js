import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import Iconify from "../../components/Iconify";
import { getCategories } from "../../services/CategoryService";
import { getTopicsByIdCategory } from "../../services/TopicService";
import {
  getDashboardCategory,
  getDashboardLevel,
  getDashboardTopic,
} from "../../services/LevelRecordService";
import { SearchbarStyle } from "../styles/SearchbarStyle";

export default function Searchbar({ handleSearch }) {
  const [idCategory, setIdCategory] = useState(0);
  const [idTopic, setIdTopic] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);

  const getCategoriesFromApi = () => {
    getCategories().then((data) => {
      setCategories(data);
    });
  };

  const getTopicsByIdCategoryFromApi = (idCategoryAux) => {
    getTopicsByIdCategory(idCategoryAux).then(
      (data) => {
        setTopics(data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };

  const handleCategory = (event) => {
    setLoading(true);
    setIdCategory(event.target.value);
    if (event.target.value !== 0) {
      getTopicsByIdCategoryFromApi(event.target.value);
    } else {
      setTopics([]);
      setIdTopic(0);
      setLoading(false);
    }
  };

  const search = () => {
    setLoading(true);
    if (idCategory === 0) {
      getDashboardCategory().then(
        (data) => {
          setLoading(false);
          handleSearch(data);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
    } else {
      if (idTopic === 0) {
        getDashboardTopic(idCategory).then(
          (data) => {
            setLoading(false);
            handleSearch(data);
          },
          (error) => {
            console.log(error);
            setLoading(false);
          }
        );
      } else {
        getDashboardLevel(idTopic).then(
          (data) => {
            console.log(data);
            setLoading(false);
            handleSearch(data);
          },
          (error) => {
            console.log(error);
            setLoading(false);
          }
        );
      }
    }
  };

  const handleTopic = (event) => {
    setIdTopic(event.target.value);
  };

  useEffect(() => {
    getCategoriesFromApi();
  }, []);

  return (
    <div>
      <IconButton>
        <Iconify icon="eva:search-fill" width={20} height={20} />
      </IconButton>
      <SearchbarStyle>
        <FormControl
          fullWidth
          sx={{ mr: 3, fontWeight: "fontWeightBold" }}
          size="small"
        >
          <InputLabel id="labelCategory">Categoría</InputLabel>
          <Select
            autoFocus
            labelId="labelCategory"
            value={idCategory}
            label="Categoría"
            onChange={handleCategory}
          >
            <MenuItem key={0} value={0}>
              Todas
            </MenuItem>
            {categories.map((category) => {
              return (
                <MenuItem key={category.idCategory} value={category.idCategory}>
                  {category.description}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          sx={{ mr: 3, fontWeight: "fontWeightBold" }}
          size="small"
        >
          <InputLabel id="labelTopic">Tema</InputLabel>
          <Select
            labelId="labelTopic"
            value={idTopic}
            label="Tema"
            onChange={handleTopic}
          >
            <MenuItem key={0} value={0}>
              Todos
            </MenuItem>
            {topics.map((topic) => {
              return (
                <MenuItem key={topic.idTopic} value={topic.idTopic}>
                  {topic.description}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <LoadingButton
          variant="contained"
          loading={loading}
          style={{ width: 300 }}
          onClick={search}
        >
          Buscar
        </LoadingButton>
      </SearchbarStyle>
    </div>
  );
}
