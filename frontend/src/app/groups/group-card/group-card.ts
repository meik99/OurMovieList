import { Component, Input } from "@angular/core";
import { Group } from "../Group";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-group-card",
  imports: [RouterLink],
  templateUrl: "./group-card.html",
  styleUrl: "./group-card.scss",
})
export class GroupCard {
  @Input()
  group?: Group;
}
