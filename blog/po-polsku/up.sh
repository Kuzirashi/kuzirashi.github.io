if jekyll build; then
  printf 'Build successful.\n'
  if rm -rf ../kuzi-hub/blog/*; then
    # rm -rf ../kuzi-hub/.git
    mkdir ../kuzi-hub/blog
    if cp -Rf _site/* ../kuzi-hub/blog; then
      cd ../kuzi-hub
      # git init
      # git checkout -b master
      git add .
      # git remote add origin git@github.com:Kuzirashi/kuzirashi.github.io.git
      git commit -m 'Changes'
      if git push origin master -u; then
        printf 'Finished!\n'
      fi
    fi
  else
    printf 'Cant remove directory.\n'
  fi
else
  printf 'Build failed.\n'
fi
