/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
// List of commands that do not require API calls
import { useState } from 'react';
import * as bin from './index';
import config from '../../../config.json';
import Router from 'next/router';
import { ethers } from 'ethers';

const desiredNFTCollections = ['0x159640309cf1e732cff90a3a7c23d3825cd50f5a'];

let ownerWallet = '';

//set state for acctounts
export const useAccounts = () => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
};

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');
  var c = '';
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    c += Object.keys(bin).sort()[i - 1] + ' ';
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
Type 'sumfetch' to display summary.
`;
};

// Connect metamask wallet and get accounts
export const connect = async (args: string[]): Promise<string> => {
  const { ethereum } = window;
  if (ethereum) {
    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      ownerWallet = accounts[0];

      // return `Connected to metamask.\nAccounts: ${accounts[0]}`;
      return `Connected to metamask.\nAccounts: ${ownerWallet}`;
    } catch (error) {
      return `Error: ${error}`;
    }
  }
  return `Error: No metamask detected.`;
};

// Connect metamask wallet and get accounts
export const mint = async (args: string[]): Promise<string> => {
  const { ethereum } = window;

  if (ethereum) {
    let error = false;
    try {
      if (ownerWallet === '') {
        return 'Error: Wallet Not Connected. Please run the connect command.';
      }

      const options = {
        method: 'GET',
        headers: { Accept: 'application/json' },
      };

      const ownerAddress = '0x8D77A8cf55f99d62D6B8AbC9050faf5859c0108f';
      // change ownerAddress
      let response = await fetch(
        'https://api.opensea.io/api/v1/assets?owner=' +
          ownerAddress +
          '&order_direction=desc&limit=20&include_orders=false',
        options,
      )
        .then((response) => response.json())
        .catch(
          (err) =>
            // ERROR
            (error = true),
        );

      if (error) {
        return 'Error Checking Wallet';
      }

      response.assets.forEach((element) => {
        if (
          desiredNFTCollections.includes(
            String(element.asset_contract.address).toLowerCase(),
          )
        ) {
          console.log(element.asset_contract);
          //handleHash(element.asset_contract.address);

          // REDIRECT

          const { pathname } = Router;
          if (pathname == '/') {
            Router.push('/mintPage');
          }
        }
      });
    } catch (error) {
      return `Error: ${error}`;
    }
  } else {
    return `Error No metamask detected.`;
  }
};

// Redirection
// export const repo = async (args: string[]): Promise<string> => {
//   window.open(`${config.repo}`);
//   return 'Opening Github repository...';
// };

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name}. 
Welcome to my website!
More about me:
'sumfetch' - short summary.
'resume' - my latest resume.
'readme' - my github readme.`;
};

// export const resume = async (args: string[]): Promise<string> => {
//   window.open(`${config.resume_url}`);
//   return 'Opening resume...';
// };

// Donate
// export const donate = async (args: string[]): Promise<string> => {
//   return `thank you for your interest.
// here are the ways you can support my work:
// - <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_urls.paypal}" target="_blank">paypal</a></u>
// - <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_urls.patreon}" target="_blank">patreon</a></u>
// `;
// };

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

// export const github = async (args: string[]): Promise<string> => {
//   window.open(`https://github.com/${config.social.github}/`);

//   return 'Opening github...';
// };

// export const linkedin = async (args: string[]): Promise<string> => {
//   window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

//   return 'Opening linkedin...';
// };

// Search
// export const google = async (args: string[]): Promise<string> => {
//   window.open(`https://google.com/search?q=${args.join(' ')}`);
//   return `Searching google for ${args.join(' ')}...`;
// };

// export const duckduckgo = async (args: string[]): Promise<string> => {
//   window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
//   return `Searching duckduckgo for ${args.join(' ')}...`;
// };

// export const bing = async (args: string[]): Promise<string> => {
//   window.open(`https://bing.com/search?q=${args.join(' ')}`);
//   return `Wow, really? You are using bing for ${args.join(' ')}?`;
// };

// export const reddit = async (args: string[]): Promise<string> => {
//   window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
//   return `Searching reddit for ${args.join(' ')}...`;
// };

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  return `a
bunch
of
fake
directories`;
};

export const cd = async (args: string[]): Promise<string> => {
  return `unfortunately, i cannot afford more directories.
if you want to help, you can type 'donate'.`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

// Banner
export const banner = (args?: string[]): string => {
  return `
  ████████     ███████████                                ████       █████████             ███                                  
 ███░░░░███   ░░███░░░░░███                              ░░███      ███░░░░░███           ░░░                                   
░░░    ░███    ░███    ░███  ██████   ████████    ██████  ░███     ███     ░░░  ████████  ████  █████████████    ██████   █████ 
   ██████░     ░██████████  ░░░░░███ ░░███░░███  ███░░███ ░███    ░███         ░░███░░███░░███ ░░███░░███░░███  ███░░███ ███░░  
  ░░░░░░███    ░███░░░░░░    ███████  ░███ ░███ ░███████  ░███    ░███          ░███ ░░░  ░███  ░███ ░███ ░███ ░███████ ░░█████ 
 ███   ░███    ░███         ███░░███  ░███ ░███ ░███░░░   ░███    ░░███     ███ ░███      ░███  ░███ ░███ ░███ ░███░░░   ░░░░███
░░████████     █████       ░░████████ ████ █████░░██████  █████    ░░█████████  █████     █████ █████░███ █████░░██████  ██████ 
 ░░░░░░░░     ░░░░░         ░░░░░░░░ ░░░░ ░░░░░  ░░░░░░  ░░░░░      ░░░░░░░░░  ░░░░░     ░░░░░ ░░░░░ ░░░ ░░░░░  ░░░░░░  ░░░░░░  
                                                                                                                                
                                                                                                                                
                                                                                                                                

Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
`;
};
