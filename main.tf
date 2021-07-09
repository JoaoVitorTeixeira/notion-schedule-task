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
      organization = var.SETTINGS.ORGANIZATION_NAME
  
        workspaces {      
            name = var.SETTINGS.WORKSPACE
        }  
    }
}