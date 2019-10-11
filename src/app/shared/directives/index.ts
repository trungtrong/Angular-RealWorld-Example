export * from './show-authed.directive';


/*
https://stackoverflow.com/questions/45724051/template-parse-errors-cant-bind-to-directive-since-it-isnt-a-known-property-o

  1

The error you're receiving is because the component is
out of scope of the import location. The reason it works
in your submodule would be because the component is declared
in that submodule. The reason it doesn't work in other modules
is because the component or directive aren't declared in the module.

Why?

At run time Angular will look at each module in a case by case basis.
 If the directive is declared in a sub-module it will check against
 components declared in that module and use the directive for them.
  If the directive is declared in your app.module it will only check
   against components directly declared in your app.module.

Solution?

The general solution is that you should declare a directive in each
 module where you declare a component that uses it. The other option
 is to add the directive into a shared module, and use the shared module
 in every other module where a component uses the directive.

*/
