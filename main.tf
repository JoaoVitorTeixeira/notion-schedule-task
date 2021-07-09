terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
    random = {
      source = "hashicorp/random"
    }
  }
  backend "remote" {
    organization = "JoaoVitorTeixeira"

    workspaces {
      name = "notion-shedule-task"
    }
  }
}