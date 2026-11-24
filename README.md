[![Bounty](https://make.fun/badge/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162.svg)](https://make.fun/bounty/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)
[![Rank](https://make.fun/badge/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162/badboy0771/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162/rank.svg)](https://make.fun/bounty/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)
[![Reward](https://make.fun/badge/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162/badboy0771/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162/reward.svg)](https://make.fun/bounty/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)

# The Standup That Never Ends

One line, 125 characters: a joke about the office ritual everyone recognises — the "15-minute" daily standup that never actually ends.

> Our 15-minute daily standup has now lasted three years, and the intern who joined it is retiring from it as a senior manager.

The setup names the specific office detail (the 15-minute daily standup), and the punchline pays it off with an absurd time scale: the meeting has outlasted an entire career, from intern to retiring senior manager. Anyone who has sat in a standup that ran long recognises it instantly, and the wording is tight enough to read in one breath.

`main.ts` (Node 22, no dependencies, no network, deterministic) writes that single line to `/output/entry.txt`, checks it is 1–200 characters, exactly one sentence ending in a period, a single line with no leading or trailing whitespace and no double spaces, and reads the file back to confirm the write is byte-identical.
