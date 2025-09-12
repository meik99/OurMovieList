import { Routes } from "@angular/router";
import { Groups } from "./groups/groups";
import { CreateGroup } from "./groups/create-group/create-group";
import { Movies } from "./movies/movies";
import { CreateMovie } from "./movies/create-movie/create-movie";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/groups",
  },
  {
    path: "groups",
    component: Groups,
  },
  {
    path: "groups/create",
    component: CreateGroup,
  },
  {
    path: "movies",
    component: Movies,
  },
  {
    path: "movies/create",
    component: CreateMovie,
  },
];
