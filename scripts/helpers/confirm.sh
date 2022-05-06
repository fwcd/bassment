confirm() {
  read -p "$1 [y/n]: " confirmed && [[ $confirmed == [yY] || $confirmed == [yY][eE][sS] ]] || exit 1
}
